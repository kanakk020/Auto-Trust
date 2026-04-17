const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AutoTrust Contracts", function () {
  let agreement, escrow;
  let owner, partyA, partyB;

  beforeEach(async function () {
    [owner, partyA, partyB] = await ethers.getSigners();

    const Agreement = await ethers.getContractFactory("AutoTrustAgreement");
    agreement = await Agreement.deploy();
    await agreement.waitForDeployment();

    const Escrow = await ethers.getContractFactory("AutoTrustEscrow");
    escrow = await Escrow.deploy(await agreement.getAddress());
    await escrow.waitForDeployment();
  });

  describe("Agreement", function () {
    it("should create an agreement", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("test-contract"));
      const tx = await agreement.createAgreement(partyA.address, partyB.address, hash);
      await tx.wait();

      const ag = await agreement.getAgreement(0);
      expect(ag.partyA).to.equal(partyA.address);
      expect(ag.partyB).to.equal(partyB.address);
      expect(ag.contractHash).to.equal(hash);
      expect(ag.status).to.equal(0); // Created
    });

    it("should emit AgreementCreated event", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("test"));
      await expect(agreement.createAgreement(partyA.address, partyB.address, hash))
        .to.emit(agreement, "AgreementCreated")
        .withArgs(0, partyA.address, partyB.address, hash);
    });

    it("should reject same address for both parties", async function () {
      const hash = ethers.keccak256(ethers.toUtf8Bytes("test"));
      await expect(
        agreement.createAgreement(partyA.address, partyA.address, hash)
      ).to.be.revertedWith("Parties must differ");
    });
  });

  describe("Escrow", function () {
    let agreementId;
    const hash = ethers.keccak256(ethers.toUtf8Bytes("deal"));

    beforeEach(async function () {
      const tx = await agreement.createAgreement(partyA.address, partyB.address, hash);
      await tx.wait();
      agreementId = 0;
    });

    it("should lock funds", async function () {
      await escrow.connect(partyA).lockFunds(agreementId, {
        value: ethers.parseEther("1"),
      });
      const balance = await escrow.escrowBalances(agreementId);
      expect(balance).to.equal(ethers.parseEther("1"));
    });

    it("should submit proof and release funds", async function () {
      await escrow.connect(partyA).lockFunds(agreementId, {
        value: ethers.parseEther("1"),
      });

      await escrow.connect(partyB).submitProof(agreementId, "QmTestCID123");

      const balBefore = await ethers.provider.getBalance(partyB.address);
      await escrow.connect(owner).releaseFunds(agreementId);
      const balAfter = await ethers.provider.getBalance(partyB.address);

      expect(balAfter).to.be.greaterThan(balBefore);
    });

    it("should handle dispute flow", async function () {
      await escrow.connect(partyA).lockFunds(agreementId, {
        value: ethers.parseEther("1"),
      });

      await escrow.connect(partyA).raiseDispute(agreementId);

      const ag = await agreement.getAgreement(agreementId);
      expect(ag.status).to.equal(4); // Disputed

      await escrow.connect(owner).resolveDispute(agreementId, false);

      const agResolved = await agreement.getAgreement(agreementId);
      expect(agResolved.status).to.equal(5); // Resolved
    });
  });
});
