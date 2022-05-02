import Web3 from "web3";

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