//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./BrownieToken.sol";
import "./TetherToken.sol";

contract YieldFarming{
    BrownieToken public brownieToken;
    TetherToken public tetherToken;
    address public owner;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStake;
    mapping(address => bool) public currentStakingStatus;

    // Modifiers
    modifier isOwner(){
        require(msg.sender == owner,'You dont have access to perform this operation !');
        _;
    }

    constructor(BrownieToken _brownieAddress,TetherToken _tetherAddress){
        brownieToken=_brownieAddress;
        tetherToken=_tetherAddress;
        owner=msg.sender;
    }    

    // 1) Stake token (Deposite)
    function stakeToken(uint _amount) public {
        require(_amount > 0,'Staking amount must be greater than 0');
        // Transfer balance from user address to contract address
        tetherToken.transferFrom(msg.sender, address(this), _amount);
        // Update staking balance
        stakingBalance[msg.sender] += _amount;
        //Push user address in stakers array if user haven't stake yet
        if(!hasStake[msg.sender]){
            stakers.push(msg.sender);
            hasStake[msg.sender] = true;
            currentStakingStatus[msg.sender] = true;
        }
    }
    
    // 2) Unstake token (withdraw)
    function unStakeToken(uint _amount) public {
        uint balance = stakingBalance[msg.sender];
        require(balance >= _amount,'You dont hant have enough amout to withdraw');
        tetherToken.transfer(msg.sender, _amount);
        stakingBalance[msg.sender] -= _amount;
        hasStake[msg.sender] = false;
    }

    // 3) Issue token (issue reword)
    function issueReword() public isOwner() {
        for(uint i=0;i < stakers.length;i++){
            address reciptant = stakers[i];
            uint balance = stakingBalance[reciptant];
            if(balance > 0){
                brownieToken.transfer(reciptant, balance);
            }
        }
    }  

    // 4) Buy tether
    function buyTether(uint256 _amount) public {
        require(_amount > 0);
        tetherToken.transfer(msg.sender, _amount);
    } 

}