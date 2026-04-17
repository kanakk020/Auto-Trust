// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./AutoTrustAgreement.sol";

contract AutoTrustEscrow is ReentrancyGuard {
    AutoTrustAgreement public agreementContract;

    mapping(uint256 => uint256) public escrowBalances;

    event FundsLocked(uint256 indexed agreementId, address indexed sender, uint256 amount);
    event ProofSubmitted(uint256 indexed agreementId, string proofCID);
    event FundsReleased(uint256 indexed agreementId, address indexed recipient, uint256 amount);
    event DisputeRaised(uint256 indexed agreementId, address indexed raisedBy);
    event DisputeResolved(uint256 indexed agreementId, bool releasedToFreelancer);

    constructor(address _agreementContract) {
        agreementContract = AutoTrustAgreement(_agreementContract);
    }

    function lockFunds(uint256 agreementId) external payable nonReentrant {
        AutoTrustAgreement.Agreement memory ag = agreementContract.getAgreement(agreementId);
        require(ag.status == AutoTrustAgreement.Status.Created, "Invalid status");
        require(msg.value > 0, "Must send funds");
        require(msg.sender == ag.partyA, "Only partyA can lock funds");

        escrowBalances[agreementId] += msg.value;
        agreementContract.setStatus(agreementId, AutoTrustAgreement.Status.FundsLocked);

        emit FundsLocked(agreementId, msg.sender, msg.value);
    }

    function submitProof(uint256 agreementId, string memory proofCID) external {
        AutoTrustAgreement.Agreement memory ag = agreementContract.getAgreement(agreementId);
        require(ag.status == AutoTrustAgreement.Status.FundsLocked, "Funds not locked");
        require(msg.sender == ag.partyB, "Only partyB can submit proof");

        agreementContract.setProofCID(agreementId, proofCID);
        agreementContract.setStatus(agreementId, AutoTrustAgreement.Status.WorkSubmitted);

        emit ProofSubmitted(agreementId, proofCID);
    }

    function releaseFunds(uint256 agreementId) external nonReentrant {
        AutoTrustAgreement.Agreement memory ag = agreementContract.getAgreement(agreementId);
        require(ag.status == AutoTrustAgreement.Status.WorkSubmitted, "Work not submitted");

        uint256 amount = escrowBalances[agreementId];
        require(amount > 0, "No funds");

        escrowBalances[agreementId] = 0;
        agreementContract.setStatus(agreementId, AutoTrustAgreement.Status.Completed);

        (bool sent, ) = ag.partyB.call{value: amount}("");
        require(sent, "Transfer failed");

        emit FundsReleased(agreementId, ag.partyB, amount);
    }

    function raiseDispute(uint256 agreementId) external {
        AutoTrustAgreement.Agreement memory ag = agreementContract.getAgreement(agreementId);
        require(
            ag.status == AutoTrustAgreement.Status.FundsLocked ||
            ag.status == AutoTrustAgreement.Status.WorkSubmitted,
            "Cannot dispute"
        );
        require(msg.sender == ag.partyA || msg.sender == ag.partyB, "Not a party");

        agreementContract.setStatus(agreementId, AutoTrustAgreement.Status.Disputed);

        emit DisputeRaised(agreementId, msg.sender);
    }

    function resolveDispute(uint256 agreementId, bool releaseToFreelancer) external nonReentrant {
        AutoTrustAgreement.Agreement memory ag = agreementContract.getAgreement(agreementId);
        require(ag.status == AutoTrustAgreement.Status.Disputed, "Not disputed");

        uint256 amount = escrowBalances[agreementId];
        escrowBalances[agreementId] = 0;
        agreementContract.setStatus(agreementId, AutoTrustAgreement.Status.Resolved);

        address recipient = releaseToFreelancer ? ag.partyB : ag.partyA;
        if (amount > 0) {
            (bool sent, ) = recipient.call{value: amount}("");
            require(sent, "Transfer failed");
        }

        emit DisputeResolved(agreementId, releaseToFreelancer);
    }
}
