const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const Contract = require('../models/Contract');
const BlockchainService = require('../services/BlockchainService');

// POST /api/contracts - create new contract
router.post('/', async (req, res) => {
  try {
    const { title, description, partyA, partyB, amount, deadline } = req.body;

    const contractHash = ethers.keccak256(
      ethers.toUtf8Bytes(JSON.stringify({ title, partyA, partyB, amount }))
    );

    let agreementId = null;
    let txHash = null;

    try {
      const result = await BlockchainService.createAgreement(
        partyA,
        partyB,
        contractHash
      );
      agreementId = result.agreementId;
      txHash = result.txHash;
    } catch (bcErr) {
      console.log('Blockchain call skipped:', bcErr.message);
    }

    const contract = await Contract.create({
      title,
      description,
      partyA,
      partyB,
      amount,
      deadline,
      contractHash,
      agreementId,
      blockchainTxHash: txHash
    });

    res.status(201).json(contract);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/contracts - get all contracts for a user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId
      ? { $or: [{ partyA: userId }, { partyB: userId }] }
      : {};
    const contracts = await Contract.find(filter)
      .populate('partyA', 'name email')
      .populate('partyB', 'name email')
      .sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/contracts/:id - get single contract
router.get('/:id', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('partyA', 'name email')
      .populate('partyB', 'name email');
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    res.json(contract);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contracts/:id/lock - lock funds
router.post('/:id/lock', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    if (contract.status !== 'Created') return res.status(400).json({ error: 'Contract not in Created state' });

    let txHash = null;
    try {
      if (contract.agreementId != null) {
        const result = await BlockchainService.lockFunds(contract.agreementId, contract.amount);
        txHash = result.txHash;
      }
    } catch (bcErr) {
      console.log('Blockchain call failed:', bcErr.message);
      return res.status(500).json({ error: 'Blockchain transaction failed' });
    }

    contract.status = 'FundsLocked';
    if (txHash) contract.blockchainTxHash = txHash;
    await contract.save();

    res.json(contract);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contracts/:id/complete - release funds
router.post('/:id/complete', async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ error: 'Contract not found' });
    if (contract.status !== 'FundsLocked' && contract.status !== 'WorkSubmitted') {
      return res.status(400).json({ error: 'Cannot complete in current state' });
    }

    let txHash = null;
    try {
      if (contract.agreementId != null) {
        // Technically releaseFunds requires WorkSubmitted state in the SC, but let's see. Need to set WorkSubmitted if not.
        // Actually the backend contract requires WorkSubmitted to call releaseFunds.
        if (contract.status === 'FundsLocked') {
           await BlockchainService.submitProof(contract.agreementId, "completed");
        }
        const result = await BlockchainService.releaseFunds(contract.agreementId);
        txHash = result.txHash;
      }
    } catch (bcErr) {
      console.log('Blockchain call failed:', bcErr.message);
      return res.status(500).json({ error: 'Blockchain transaction failed' });
    }

    contract.status = 'Completed';
    if (txHash) contract.blockchainTxHash = txHash;
    await contract.save();

    res.json(contract);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
