const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const testNftContract = await hre.ethers.deployContract("TestNFT");
  await testNftContract.waitForDeployment();
  console.log("TestNFT deployed to:", testNftContract.target);

  const testMarketplaceContract = await hre.ethers.deployContract("TestMarketplace");
  await testMarketplaceContract.waitForDeployment();
  console.log("TestMarketplace deployed to:", testMarketplaceContract.target);

  const amount = hre.ethers.parseEther("1");
  const testDaoContract = await hre.ethers.deployContract("TestDAO", [testMarketplaceContract.target, testNftContract.target,], {value: amount,});
  await testDaoContract.waitForDeployment();
  console.log("TestDAO deployed to:", testDaoContract.target);

  await sleep(30 * 1000);

  await hre.run("verify:verify", {
    address: testNftContract.target,
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: testMarketplaceContract.target,
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: testDaoContract.target,
    constructorArguments: [
      testMarketplaceContract.target,
      testNftContract.target,
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});