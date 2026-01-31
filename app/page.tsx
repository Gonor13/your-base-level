'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const levelNames = ['Beginner','Explorer','Rising','Active','Established','Veteran','Elite','Master','Legend','OG']
const levelColors = ['#9E9E9E','#4CAF50','#2196F3','#3F51B5','#9C27B0','#FF5722','#FF9800','#FFC107','#FFEB3B','#0052FF']

export default function Home() {
  const [connected,setConnected]=useState(false)
  const [loading,setLoading]=useState(false)
  const [level,setLevel]=useState(0)
  const [levelName,setLevelName]=useState('')
  const [levelColor,setLevelColor]=useState('')
  const [address,setAddress]=useState('')
  const [hasMinted,setHasMinted]=useState(false)

  useEffect(()=>{
    if(typeof window.ethereum!=='undefined'){
      window.ethereum.request({method:'eth_accounts'}).then(accounts=>{
        if(accounts.length>0){
          setConnected(true)
          setAddress(accounts[0].slice(0,6)+'...'+accounts[0].slice(-4))
          setLevel(Math.floor(Math.random()*10)+1)
          const lvl=Math.floor(Math.random()*10)+1
          setLevel(lvl)
          setLevelName(levelNames[lvl-1])
          setLevelColor(levelColors[lvl-1])
        }
      }).catch(console.error)
    }
  },[])

  const connectWallet=async()=>{
    try{
      await window.ethereum.request({method:'eth_requestAccounts'})
      window.location.reload()
    }catch(e){console.error(e)}
  }

  const handleMint=async()=>{
    try{
      const provider=new ethers.BrowserProvider(window.ethereum)
      const signer=await provider.getSigner()
      const contract=new ethers.Contract('0xa61878Cd14f87F22623A44Cf54D8F2F0a0E6c11a',['function mint() public'],signer)
      const tx=await contract.mint()
      await tx.wait()
      setHasMinted(true)
      alert('Minted!')
    }catch(e){alert('Failed')}
  }

  const handleShare=()=>{
    const text='My Base Level is '+level+'\nhttps://your-base-level.vercel.app'
    if(navigator.share){navigator.share({title:'Base Level',text:text})}
    else{navigator.clipboard.writeText(text);alert('Copied!')}
  }

  if(!connected){
    return <div className='min-h-screen bg-black flex items-center justify-center'><button onClick={connectWallet} className='px-6 py-3 bg-[#0052FF] text-white rounded font-bold'>Connect Wallet</button></div>
  }

  if(level===0){
    return <div className='min-h-screen bg-black flex items-center justify-center text-white text-2xl'>Loading...</div>
  }

  return <div className='min-h-screen bg-black flex items-center justify-center p-4'><div className='w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center'><h1 className='text-4xl font-bold mb-2' style={{color:levelColor}}>{level}</h1><p className='text-lg text-gray-400 mb-1'>{levelName}</p><p className='text-sm text-gray-500 mb-6'>{address}</p><div className='space-y-3'><button onClick={handleShare} className='w-full py-2 bg-[#0052FF] text-white rounded font-medium'>Share Level</button><button onClick={handleMint} disabled={hasMinted} className={'w-full py-2 rounded font-medium '+(hasMinted?'bg-gray-700 text-gray-400':'bg-white text-black')}>{hasMinted?'Minted':'Mint NFT'}</button></div><div className='mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500'>Gas fees only</div></div></div>
}