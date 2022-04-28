const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) =>{
  return ethers.utils.parseUnits(n,'ether')
}

describe("Farming", function () {
  

    var brownieToken, tetherToken, yieldFarming, owner, investor;
    
    before(async () => {

      [owner, investor] = await ethers.getSigners();

      const BrownieToken = await hre.ethers.getContractFactory("BrownieToken");
      brownieToken = await BrownieToken.deploy();
  
      const TetherToken = await hre.ethers.getContractFactory("TetherToken");
      tetherToken = await TetherToken.deploy();

      const YieldFarming = await hre.ethers.getContractFactory("YieldFarming");
      yieldFarming = await YieldFarming.deploy(brownieToken.address,tetherToken.address);

      // Transfer all Dapp tokens to farm (1 million)
      await brownieToken.transfer(yieldFarming.address, tokens('1000000'))

      // Send tokens to investor
      await tetherToken.transfer(investor.address, tokens('100'), { from: owner.address })

    })

    describe('Mock TETHER token deployment', async () => {
      it('Name must be Mock TETHER Token', async () => {
        const name = await tetherToken.name()
        expect(name).to.equal("Mock TETHER Token");
      })
    })

    describe('Brownie token deployment', async () => {
      it('Name must be BROWNIE Token', async () => {
        const name = await brownieToken.name()
        expect(name).to.equal("BROWNIE Token");
      })
    })

    describe('YieldFarming deployment', async () => {
      it('BROWNIE Token address must match', async () => {
        const address = await yieldFarming.brownieToken()
        expect(address).to.equal(brownieToken.address);
      })
      it('TETHER Token address must match', async () => {
        const address = await yieldFarming.tetherToken()
        expect(address).to.equal(tetherToken.address);
      })
      it('Contract must have 1000000 brownie token', async () => {
        const balance = await brownieToken.balanceOf(yieldFarming.address)
        expect(balance.toString()).to.equal(tokens('1000000'));
      })
    })


});
