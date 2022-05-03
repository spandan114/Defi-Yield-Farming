import web3 from "web3";

export const weiToEther = (web3,num) =>{
    const amount = web3.utils.fromWei(num, 'ether')
    return Math.round(amount * 100)/100
}

export const etherToWei = (web3,num) => {
  const weiBigNumber = web3.utils.toWei(num, 'ether');
  const wei = weiBigNumber.toString();
  return wei
}

export const round = (num) => {
  return Math.round(num * 100)/100
}

export const connectWithWallet = async () => {
  //connect web3 with http provider
  if (window.ethereum) {
   window.ethereum.request({method:"eth_requestAccounts"})
   .then(res=>{

   }).catch(error=>{
     alert(error.message)
   })
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

export const chainOrAccountChangedHandler = () => {
  // reload the page to avoid any errors with chain or account change.
  window.location.reload();
}