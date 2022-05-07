import {useEffect, useState} from 'react'
import Image from 'next/image';
import tether from '../public/tether.svg'
import {connectWithWallet, etherToWei, round, weiToEther} from '../utils/helper'
import { toastError } from '../utils/toastMessage';
import { buyTether, issueReword, stakeToken,unStakeToken } from '../utils/interaction';

const FarmingComponent = ({walletAddress,web3,farmingContract,brownieContract,tetherContract,ownerAddress}) => {

    const [inputBalance, setInputBalance] = useState(0);
    const [stakingBalance, setStakingBalance] = useState(0);
    const [rewordBalance, setRewordBalance] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);

    useEffect(() => {
        if(walletAddress && tetherContract && farmingContract && brownieContract && web3){
            (async()=>{
                const amount = await tetherContract.methods.balanceOf(walletAddress).call();
                setWalletBalance(weiToEther(web3,amount))
                const stakingBalance = await farmingContract.methods.stakingBalance(walletAddress).call();
                setStakingBalance(weiToEther(web3,stakingBalance))
                const rewordBalance = await brownieContract.methods.balanceOf(walletAddress).call();
                setRewordBalance(weiToEther(web3,rewordBalance))
            })()
        }
    }, [walletAddress,web3])   
    
    const stakeBalance = () =>{
        if(inputBalance < 1){
            toastError("Please enter valid staking amount !");
            return;
        }

        if(walletBalance <=  inputBalance){
            toastError("You dont have enough tether balance to stake !");
            return;
        }

        const onSuccess = (res) =>{
            var resAmount = weiToEther(web3,res)
            setStakingBalance(stakingBalance+resAmount)
            setWalletBalance(walletBalance-resAmount)
            setInputBalance(0)
        }
        const onError = (err) =>{
            toastError(err)
        }

        stakeToken(farmingContract,tetherContract,walletAddress,etherToWei(web3,inputBalance),onSuccess,onError)
    }

    const unStakeBalance = () =>{
        if(stakingBalance < 1){
            toastError("You dont have enough tether to un-staking !");
            return;
        }

        const onSuccess = (res) =>{
            var resAmount = weiToEther(web3,res)
            setStakingBalance(stakingBalance-resAmount)
            setWalletBalance(walletBalance+resAmount)
            setInputBalance(0)
        }
        const onError = (err) =>{
            toastError(err)
        }

        console.log(stakingBalance)
        console.log(etherToWei(web3,String(stakingBalance)))

        unStakeToken(farmingContract,walletAddress,etherToWei(web3,String(stakingBalance)),onSuccess,onError)
    }

    const purchaseTether = () =>{

        if(!farmingContract){
            toastError("Invalid chain !");
            return; 
        }
        if(!walletAddress){
            toastError("Please connect with wallet !");
            return;
        }

        const onSuccess = (res) =>{
            var resAmount = weiToEther(web3,res)
            setWalletBalance(walletBalance+resAmount)
        }
        const onError = (err) =>{
            toastError(err)
        }
        buyTether(farmingContract,walletAddress,etherToWei(web3,"2"),onSuccess,onError)
    }

  return (
    <div className='farming-container self-center m-2 lg:m-0'>

        <h1 className='text-xl text-white font-bold'>Brownie Yield Farm</h1>
        <div className='flex justify-between pt-1'>
            <p className='text-sm text-white'><strong className='font-bold'>Wallet balance :</strong> {walletBalance} <small className='font-bold'>TETHER</small></p>
            {
                walletAddress?
                    <p className='text-sm text-white font-bold w-20 lg:w-40 truncate'>{walletAddress}</p>
                :
                <button className='connect-btn' onClick={()=>connectWithWallet()}>Connect with wallet</button>                
            }
            
        </div>

        <div className='flex justify-between pt-6 lg:pt-12'>
            <div className='p-3 bg-[#72737D] w-2/5 rounded-md'>
                <p className='text-white'><strong className='font-bold'>Staking balance</strong> {stakingBalance}</p>
            </div>
            <div className='p-3 bg-[#72737D] w-2/5 rounded-md'>
                <p className='text-white'><strong className='font-bold'>Reword balance </strong> {rewordBalance}</p>
            </div>
        </div>

        <div className="flex flex-row pt-6">
            <input type="number" placeholder="Type here" value={inputBalance} onChange={e=>setInputBalance(e.target.value)} className="input rounded-l-md" />
            <span className="input-btn-label flex items-center justify-center" >
                <Image src={tether} width={30} height={30} alt="tether image"/>
                <p className='font-white font-bold'>Tether</p>
            </span>
        </div>

        <button className='stake' onClick={()=>stakeBalance()}>STAKE</button>
        <button className='un-stake' onClick={()=>unStakeBalance()}>UN-STAKE</button>
        <button className='add-tether' onClick={()=>purchaseTether()}>Add 2TETHER in your account for testing</button>
        {
          (walletAddress && ownerAddress) && (walletAddress == ownerAddress) ?
          <button className='p-2 bg-white font-bold w-full rounded-sm ' onClick={()=>issueReword(farmingContract,walletAddress)}>Issue reword</button>
          :
          ""
        }
  
    </div>

  )
}

export default FarmingComponent