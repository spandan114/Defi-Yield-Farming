//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./BrownieToken.sol";
import "./TetherToken.sol";

contract YieldFarming{
    BrownieToken public brownieToken;
    TetherToken public tetherToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStake;
    mapping(address => bool) public currentStakingStatus;

    constructor(BrownieToken _brownieAddress,TetherToken _tetherAddress){
        brownieToken=_brownieAddress;
        tetherToken=_tetherAddress;
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
    // 3) Issue token (issue reword)

    

}