const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) =>{
  return ethers.utils.parseUnits(n,'ether')
}

describe("Yield Farming", function () {
  

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
      await tetherToken.transfer(investor.address, tokens('10'), { from: owner.address })

      //Approve & transfer token to yield farming contract
      await tetherToken.transfer(yieldFarming.address, tokens('10'), { from: owner.address })

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

    describe('Yield farming functionality', async () => {
      it('Stake token', async () => {
       const balanceOfInvestorBeforeStaking = await tetherToken.balanceOf(investor.address);
       expect(balanceOfInvestorBeforeStaking.toString()).to.equal(tokens('10'));

       // Approve token
       await tetherToken.connect(investor).approve(yieldFarming.address,tokens('8'))
       // Stake token
       await yieldFarming.connect(investor).stakeToken(tokens('8'))

       const balanceOfInvestorAfterStaking = await tetherToken.balanceOf(investor.address);
       expect(balanceOfInvestorAfterStaking.toString()).to.equal(tokens('2'));

       var investorStakingBalance = await yieldFarming.stakingBalance(investor.address);
       var investorHasStake = await yieldFarming.hasStake(investor.address);
       var investorCurrentStakingStatus = await yieldFarming.currentStakingStatus(investor.address);
       
       expect(investorStakingBalance.toString()).to.equal(tokens('8'));
       expect(investorHasStake).to.equal(true);
       expect(investorCurrentStakingStatus).to.equal(true,"True");

      })

      it('Should failed if reword issuer is not contract owner', async () => {
        await expect(yieldFarming.connect(investor).issueReword()).to.be.revertedWith('You dont have access to perform this operation !');
      })

      it('Issue reword', async () => {
        
        await yieldFarming.connect(owner).issueReword();
        const investorStakingBalance = await yieldFarming.stakingBalance(investor.address);
        const investorRewordBalance = await brownieToken.balanceOf(investor.address);
        expect(investorStakingBalance.toString()).to.equal(investorRewordBalance.toString());

      })

      it('Unstake tether token', async () => {
        
        await yieldFarming.connect(investor).unStakeToken(tokens('4'));
        const investorContractBalance = await yieldFarming.stakingBalance(investor.address);
        const investorBalance = await tetherToken.balanceOf(investor.address);
        expect(investorContractBalance.toString()).to.equal(tokens('4'));
        expect(investorBalance.toString()).to.equal(tokens('6'));

      })

      it('Buy tether', async () => {
        
        await yieldFarming.connect(investor).buyTether(tokens('2'));
        const investorBalance = await tetherToken.balanceOf(investor.address);
        expect(investorBalance.toString()).to.equal(tokens('8'));

      })

    })

});
