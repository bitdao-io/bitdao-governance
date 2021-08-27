import { useCallback, useEffect, useState } from "react";
// import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import COMPABI from "../abi/Comp.json";
import NotifyPopup from "../pages/Governance/Components/NotifyPopup/NotifyPopup";
// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = process.env.REACT_APP_INFURA_KEY;

const NETWORK_NAME = `${process.env.REACT_APP_NETWORK_NAME}`;

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
  }: any = config;

  // Web3Modal also supports many other wallets.
  // You can see other options at https://github.com/Web3Modal/web3modal
  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    },
  });

  // Open wallet selection modal.
  const loadWeb3Modal = useCallback(async () => {
    const newProvider = await web3Modal.connect();

    const web3: any = new Web3(newProvider);
    const net = await web3.eth.net.getId();
   
    setNetworkId(net);
    const contracts = await getContracts(web3);
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts[0]);
    setProvider(web3);
    setContracts(contracts);

    window.ethereum.on("accountsChanged", function (accounts: any) {
      setAccounts(accounts[0]);
    });

  }, [web3Modal, accounts]);

  const logoutOfWeb3Modal = useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );
  const getContracts = async (provider: any) => {
    const networkId: any = await provider.eth.net.getId();

    //const deployedNetwork:any = COMPABI.networks[networkId];

    const comp = new provider.eth.Contract(
      COMPABI.abi,
      process.env.REACT_APP_CONTRACT_ADDR
    );

    return comp;
  };
  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [
    autoLoad,
    autoLoaded,
    loadWeb3Modal,
    setAutoLoaded,
    web3Modal.cachedProvider,
  ]);

  return [provider, loadWeb3Modal, logoutOfWeb3Modal, contracts, accounts, networkId];
}

export default useWeb3Modal;
