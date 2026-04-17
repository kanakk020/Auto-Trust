const hre = require("hardhat");

async function main() {
  const Agreement = await hre.ethers.getContractFactory("AutoTrustAgreement");
  const agreement = await Agreement.deploy();
  await agreement.waitForDeployment();
  const agreementAddr = await agreement.getAddress();
  console.log("AutoTrustAgreement deployed to:", agreementAddr);

  const Escrow = await hre.ethers.getContractFactory("AutoTrustEscrow");
  const escrow = await Escrow.deploy(agreementAddr);
  await escrow.waitForDeployment();
  const escrowAddr = await escrow.getAddress();
  console.log("AutoTrustEscrow deployed to:", escrowAddr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
