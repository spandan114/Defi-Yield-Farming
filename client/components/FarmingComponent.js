import {useEffect, useState} from 'react'
import Image from 'next/image';
import tether from '../public/tether.svg'
import {connectWithWallet, round, weiToEther} from '../utils/helper'

const FarmingComponent = ({walletAddress,web3,farmingContract,brownieContract}) => {

    const [inputBalance, setInputBalance] = useState(0);
    const [stakingBalance, setStakingBalance] = useState(0);
    const [rewordBalance, setRewordBalance] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);

    useEffect(() => {
        if(walletAddress && web3){
            (async()=>{
                const amount = await web3.eth.getBalance(walletAddress);
                setWalletBalance(weiToEther(web3,amount))
                const stakingBalance = await farmingContract.methods.stakingBalance(walletAddress).call();
                setStakingBalance(weiToEther(web3,stakingBalance))
                const rewordBalance = await brownieContract.methods.balanceOf(walletAddress).call();
                setRewordBalance(weiToEther(web3,rewordBalance))
            })()
        }
    }, [walletAddress,web3])    

  return (
    <div className='farming-container self-center m-2 lg:m-0'>
        <h1 className='text-xl text-white font-bold'>Brownie Yield Farm</h1>
        <div className='flex justify-between pt-1'>
            <p className='text-sm text-white'><strong className='font-bold'>Wallet balance :</strong> {walletBalance} ETH</p>
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

        <button className='stake'>STAKE</button>
        <button className='un-stake'>UN-STAKE</button>

    </div>

  )
}

export default FarmingComponent