//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./BrownieToken.sol";
import "./TetherToken.sol";

contract YieldFarming{
    BrownieToken public brownieToken;
    TetherToken public tetherToken;

    constructor(BrownieToken _brownieAddress,TetherToken _tetherAddress){
        brownieToken=_brownieAddress;
        tetherToken=_tetherAddress;
    }    
}