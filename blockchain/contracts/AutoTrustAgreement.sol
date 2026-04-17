// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AutoTrustAgreement {
    enum Status {
        Created,
        FundsLocked,
        WorkSubmitted,
        Completed,
        Disputed,
        Resolved
    }

    struct Agreement {
        uint256 agreementId;
        address partyA;
        address partyB;
        bytes32 contractHash;
        string proofCID;
        Status status;
    }

    uint256 private _nextId;
    mapping(uint256 => Agreement) public agreements;

    event AgreementCreated(
        uint256 indexed agreementId,
        address indexed partyA,
        address indexed partyB,
        bytes32 contractHash
    );

    event StatusChanged(uint256 indexed agreementId, Status newStatus);

    function createAgreement(
        address partyA,
        address partyB,
        bytes32 contractHash
    ) external returns (uint256) {
        require(partyA != address(0) && partyB != address(0), "Invalid address");
        require(partyA != partyB, "Parties must differ");

        uint256 id = _nextId++;
        agreements[id] = Agreement({
            agreementId: id,
            partyA: partyA,
            partyB: partyB,
            contractHash: contractHash,
            proofCID: "",
            status: Status.Created
        });

        emit AgreementCreated(id, partyA, partyB, contractHash);
        return id;
    }

    function getAgreement(uint256 id) external view returns (Agreement memory) {
        return agreements[id];
    }

    function setStatus(uint256 id, Status status) external {
        agreements[id].status = status;
        emit StatusChanged(id, status);
    }

    function setProofCID(uint256 id, string memory cid) external {
        agreements[id].proofCID = cid;
    }
}
