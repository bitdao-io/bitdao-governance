import { useCallback, useEffect, useState } from "react";
// import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import COMPABI from "../abi/Comp.json";
// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = process.env.REACT_APP_INFURA_KEY;
const CONTRACT_ADDR = process.env.REACT_APP_CONTRACT_ADDR;


const NETWORK_NAME = `${process.env.REACT_APP_NETWORK_NAME}`;
const APP_NETWORK_ID = `${process.env.REACT_APP_NETWORK_ID}`;
const web3Modal = new Web3Modal({
  network: NETWORK_NAME,
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        INFURA_ID,
      },
    },
  },
});

function useWeb3Modal(config = {}) {
  const [provider, setProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [contracts, setContracts]: any = useState(undefined);
  const [accounts, setAccounts]: any = useState(undefined);
  const [networkId, setNetworkId]: any = useState(undefined);
  const {
    autoLoad = true,
    infuraId = INFURA_ID,
    NETWORK = NETWORK_NAME,
    appNetworkId = APP_NETWORK_ID,
    contractAddr = CONTRACT_ADDR,
  }: any = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();

    const provider: any = new ethers.providers.Web3Provider(newProvider, 'any');
    const net = await provider.getNetwork();
    const chainId = net.chainId

    
    console.log(net.chainId)
    
    const ethereum = window.ethereum;
    
    setNetworkId(net.chainId);
    provider.on("network", (network: any, oldNetwork: any) => {
      
      console.log(network.chainId);
      console.log(`test network ${network.chainId}`);
      setNetworkId(network.chainId);
      if (network.chainId != appNetworkId) {
        console.log(`wrong network please change to ${network.chainId} ${appNetworkId} ${NETWORK}`);
        return;
      }
      // loadWeb3Modal();

    });
    const contracts = await getContracts(provider);
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    setAccounts(accounts[0]);
    setProvider(provider);
    setContracts(contracts);

    window.ethereum.on("accountsChanged", function (accounts: any) {
      setAccounts(accounts[0]);
    });

    if (window.ethereum?.on) {
      window.ethereum.on('chainChanged', (chainId: number) => {
        console.log(`chain changed to ${chainId}! updating providers`);
      
        setNetworkId(chainId);
      });
      window.ethereum.on('accountsChanged', () => {
        console.log(`account changed!`);
        
      });
      

      window.ethereum.on('disconnect', (code: any, reason: any) => {
        console.log(code, reason);
      });
    }

  }, []);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    []
  );
  const getContracts = async (provider: any) => {
    const networkId: number = await provider.getNetwork();

    //const deployedNetwork:any = COMPABI.networks[networkId];

    const comp = new ethers.Contract(
      contractAddr,
      COMPABI.abi,
      provider.getSigner()
    );

    return comp;
  };
  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    console.log('outside')

    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
      console.log('inside')
    }
  }, [
    
    autoLoaded,
    
    networkId,
    setNetworkId
  ]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, contracts, accounts, networkId];
}

export default useWeb3Modal;
