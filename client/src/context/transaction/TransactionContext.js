import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from 'ethers'
import ModalContext from '../modal/ModalContext'
import { abi, contractAddress } from '../../utils/constants'
import { buyProduct } from "../../api";
import AuthContext from "../auth/AuthContext";

const TransactionContext = createContext({})

export const TransactionProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const { setMessage, open } = useContext(ModalContext)
  const { auth } = useContext(AuthContext)

  const { ethereum } = window;

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);
    return { contract, provider }
  }

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    try {
      const connectedAddress = await signer.getAddress();
      setWalletAddress(connectedAddress)
    } catch (err) {
      setWalletAddress('')
    }
  }

  const connectWallet = async () => {
    if (!ethereum) {
      setMessage("Please Install Metamask")
      open();
      return
    } else if (!auth.user) {
      setMessage("Please Log In First")
      open();
      return
    }
    else {
      await ethereum.request({ method: 'eth_requestAccounts' })
      await getAddress();
    }
  }

  const buy = async (to, name, id, amt) => {
    const { contract, provider } = getContract();
    try {
      const parseAmt = ethers.utils.parseEther(amt.toString());
      setIsLoading(true)
      const txResponse = await contract.transfer(to, name, id, { value: parseAmt })
      await listenForTransactionMine(txResponse, provider)
      const { data } = await buyProduct(id);
      setIsLoading(false)
      setMessage("Bought Successfully")
      open();
      return;

    } catch (err) {
      console.log(err.message)
    }
  }

  const getBalance = async () => {
    const { contract, provider } = getContract();
    try {
      const txResponse = await contract.getBalance()
      return Number(txResponse._hex)
    } catch (err) {
      console.error(err)
      return
    }
  }

  const listenForTransactionMine = (txResponse, provider) => {
    console.log('Mining ' + txResponse.hash + '...');
    return new Promise((resolve, reject) => {
      provider.once(txResponse.hash, (txReceipt) => {
        console.log(`Completed with ${txReceipt.confirmations} confirmations`)
        resolve();
      })
    })
  }

  const withDraw = async () => {
    const { contract, provider } = getContract();
    try {
      setIsLoading(true)
      const txResponse = await contract.withdraw()
      await listenForTransactionMine(txResponse, provider)
      setIsLoading(false)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getAddress();
  }, [getAddress, walletAddress])

  return (
    <TransactionContext.Provider value={{ walletAddress, connectWallet, buy, getBalance, withDraw, isLoading }}>
      {children}
    </TransactionContext.Provider >
  )
}


export default TransactionContext;