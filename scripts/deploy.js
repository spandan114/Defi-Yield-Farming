const hre = require("hardhat");

const tokens = (n) =>{
  return hre.ethers.utils.parseUnits(n,'ether')
}

async function main() {

  const [owner, investor1,investor2] = await hre.ethers.getSigners();

  // We get the contract to deploy
  const BrownieToken = await hre.ethers.getContractFactory("BrownieToken");
  const brownieToken = await BrownieToken.deploy();
  await brownieToken.deployed();
  console.log("BrownieToken deployed to:", brownieToken.address);

  const TetherToken = await hre.ethers.getContractFactory("TetherToken");
  const tetherToken = await TetherToken.deploy();
  await tetherToken.deployed();
  console.log("TetherToken deployed to:", tetherToken.address);

  const YieldFarming = await hre.ethers.getContractFactory("YieldFarming");
  const yieldFarming = await YieldFarming.deploy(brownieToken.address,tetherToken.address);
  await yieldFarming.deployed();
  console.log("YieldFarming deployed to:", yieldFarming.address);

  await tetherToken.transfer(yieldFarming.address, tokens('1000000'), { from: owner.address })
  await brownieToken.transfer(yieldFarming.address, tokens('1000000'))

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
