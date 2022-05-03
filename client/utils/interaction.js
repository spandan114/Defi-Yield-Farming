import Web3 from "web3";
import brownieABI from '../artifacts/contracts/BrownieToken.sol/BrownieToken.json'
import tetherABI from '../artifacts/contracts/TetherToken.sol/TetherToken.json'
import yieldFarmingABI from '../artifacts/contracts/YieldFarming.sol/YieldFarming.json'

// Load web3
export const loadWeb3 = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    return web3;
};

// Load connected wallet
export const loadAccount = async (web3) => {
    const account = await web3.eth.getAccounts();
    const network = await web3.eth.net.getId();
    return account;
};

// Connect with Brownie Token contract
export const loadBrownieTokenContract = async(web3,dispatch) =>{
    const brownieToken = new web3.eth.Contract(brownieABI.abi,process.env.BrownieTokenAddress);
    return brownieToken;
}

// Connect with Tether Token contract
export const loadTetherTokenContract = async(web3,dispatch) =>{
    const tetherToken = new web3.eth.Contract(tetherABI.abi,process.env.TetherTokenAddress);
    return tetherToken;
}

// Connect with YieldFarming Token contract
export const loadYieldFarmingContract = async(web3,dispatch) =>{
    const yieldFarmingToken = new web3.eth.Contract(yieldFarmingABI.abi,process.env.YieldFarmingAddress);
    return yieldFarmingToken;
}