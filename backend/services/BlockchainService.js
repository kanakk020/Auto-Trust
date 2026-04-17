const { ethers } = require('ethers');
const path = require('path');

const agreementArtifact = require(path.join(__dirname, '../../blockchain/artifacts/contracts/AutoTrustAgreement.sol/AutoTrustAgreement.json'));
const escrowArtifact = require(path.join(__dirname, '../../blockchain/artifacts/contracts/AutoTrustEscrow.sol/AutoTrustEscrow.json'));

const RPC_URL = process.env.HARDHAT_RPC_URL || 'http://127.0.0.1:8545';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const AGREEMENT_ADDRESS = process.env.AGREEMENT_CONTRACT_ADDRESS || '';
const ESCROW_ADDRESS = process.env.ESCROW_CONTRACT_ADDRESS || '';

function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL);
}

function getSigner() {
  const provider = getProvider();
  return new ethers.Wallet(PRIVATE_KEY, provider);
}

function getAgreementContract() {
  return new ethers.Contract(AGREEMENT_ADDRESS, agreementArtifact.abi, getSigner());
}

function getEscrowContract() {
  return new ethers.Contract(ESCROW_ADDRESS, escrowArtifact.abi, getSigner());
}

async function createAgreement(partyA, partyB, contractHash) {
  const contract = getAgreementContract();
  const tx = await contract.createAgreement(partyA, partyB, contractHash);
  const receipt = await tx.wait();
  const event = receipt.logs.find(log => {
    try {
      return contract.interface.parseLog(log)?.name === 'AgreementCreated';
    } catch { return false; }
  });
  const parsed = contract.interface.parseLog(event);
  return { agreementId: Number(parsed.args.agreementId), txHash: receipt.hash };
}

async function lockFunds(agreementId, amount) {
  const escrow = getEscrowContract();
  const tx = await escrow.lockFunds(agreementId, { value: ethers.parseEther(amount.toString()) });
  const receipt = await tx.wait();
  return { txHash: receipt.hash };
}

async function submitProof(agreementId, proofCID) {
  const escrow = getEscrowContract();
  const tx = await escrow.submitProof(agreementId, proofCID);
  const receipt = await tx.wait();
  return { txHash: receipt.hash };
}

async function releaseFunds(agreementId) {
  const escrow = getEscrowContract();
  const tx = await escrow.releaseFunds(agreementId);
  const receipt = await tx.wait();
  return { txHash: receipt.hash };
}

async function raiseDispute(agreementId) {
  const escrow = getEscrowContract();
  const tx = await escrow.raiseDispute(agreementId);
  const receipt = await tx.wait();
  return { txHash: receipt.hash };
}

async function resolveDispute(agreementId, releaseToFreelancer) {
  const escrow = getEscrowContract();
  const tx = await escrow.resolveDispute(agreementId, releaseToFreelancer);
  const receipt = await tx.wait();
  return { txHash: receipt.hash };
}

module.exports = {
  createAgreement,
  lockFunds,
  submitProof,
  releaseFunds,
  raiseDispute,
  resolveDispute
};
