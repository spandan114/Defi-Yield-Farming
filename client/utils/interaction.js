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
    return account;
};

// Connect with Brownie Token contract
export const loadBrownieTokenContract = async(web3) =>{
    const network = await web3.eth.net.getId();
    if(network !== process.env.ChainId){
        return null
    }
    const brownieToken = new web3.eth.Contract(brownieABI.abi,process.env.BrownieTokenAddress);
    return brownieToken;
}

// Connect with Tether Token contract
export const loadTetherTokenContract = async(web3) =>{
    const network = await web3.eth.net.getId();
    if(network !== process.env.ChainId){
        return null
    }
    const tetherToken = new web3.eth.Contract(tetherABI.abi,process.env.TetherTokenAddress);
    return tetherToken;
}

// Connect with YieldFarming Token contract
export const loadYieldFarmingContract = async(web3) =>{
    const network = await web3.eth.net.getId();
    if(network !== process.env.ChainId){
        return null
    }
    const yieldFarmingToken = new web3.eth.Contract(yieldFarmingABI.abi,process.env.YieldFarmingAddress);
    return yieldFarmingToken;
}

export const stakeToken = async(farmingContract,tetherContract,address,amount,onSuccess,onError)=>{
    await tetherContract.methods.approve(process.env.YieldFarmingAddress,amount).send({from:address})
    .on('receipt', async function(receipt){

        await farmingContract.methods.stakeToken(amount).send({from:address})
            .on('receipt', function(receipt){
                onSuccess(amount)
            })
            .on('error', function(error){ 
            onError(error.message)
            })
        })

    .on('error', function(error){ 
      onError(error.message)
    })
}


export const unStakeToken = async(farmingContract,address,amount,onSuccess,onError)=>{
    await farmingContract.methods.unStakeToken(amount).send({from:address})
     .on('receipt', function(receipt){
        onSuccess(amount)
      })
     .on('error', function(error){ 
       onError(error.message)
     })
}

export const issueReword = async(farmingContract,address) =>{
    
    await farmingContract.methods.issueReword().send({from:address})
    .on('receipt', function(receipt){
       console.log(receipt)
     })
    .on('error', function(error){ 
      console.log(error.message)
    })
}

export const buyTether = async(farmingContract,address,amount,onSuccess,onError) =>{
    console.log(amount)
    await farmingContract.methods.buyTether(amount).send({from:address})
    .on('receipt', function(receipt){
        onSuccess(amount)
     })
    .on('error', function(error){ 
        onError(error.message)
    })
}