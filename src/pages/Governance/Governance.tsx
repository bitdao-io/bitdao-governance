import React from "react";
import axios from "axios";

import WalletButton from "../../components/WalletButton";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import DelegateVoting from "./DelegateVoting";
import ConfiramtionPopup from "./ConfirmationPopup";
import DelegateList from "./DelegateList";
import handleNumberFormat from "../../helpers/handleNumberFormat";
import handleIntegerFormat from "../../helpers/handleIntegerFormat";
import addressTruncate from "../../helpers/addressTruncate";
// import NotifyPopup from "../../components/NotifyPopup";

// These addresses are known
const addressMap: Record<string, string> = {
  "0x853edd954dd508117cb957918378c976ac390d8e": "Bybit",
  "0x09da12f0977ed3534124a4f593d9c1a243bea598": "Cateatpeanut", // cateatpeanut.eth
  "0x03ba846444aab999f1536bdfa3241fd900e4a84f": "Mirana Ventures",
  "0x7e2f1cf2174788e3dba18a3633cd33bba047b38d": "Davion Labs", // davionlabs.eth
  "0x4e0189610ae7a2d508374edbff728cb1013c5615": "Game7 Labs",
  "0x75c53632fb3ed2d97f4427df9b14e844ce9b6520": "Mantle Coordinator", //littlehannah.eth
  "0xf23d8514b671262ac91a9f46b97901fa8833ab73": "Mantle Engineering",
  "0x8c1b9df70e6cf13f8387dc2870afb3c7091f3ad5": "Mantle Product", // themantlelorian.eth
  "0x7875923047c6043f98bdeb17f237f941c6e9fdef": "Mantle Ecosystem",
  "0x4a8b77019176401ba65446cb9865a64bd2e4bc67": "Dragonfly",
  "0x5bc928bf0dab1e4a2ddd9e347b0f22e88026d76c": "Pantera",
  "0x2573010a8183a7e8bb4ad744b44cf6feb3284e8e": "Spartan"
};

function Governance() {
  const [connected, setConnected] = React.useState(false);
  const [bitBalance, setBitBalance]: any = React.useState("0");
  const [open, setOpen] = React.useState(false);
  // const [openDelegate, setOpenDelegate] = React.useState(false);
  const [confirmTx, setConfirmTx] = React.useState(false);
  const [delegationToAddr, setDelegationToAddr] = React.useState("");
  const [txHash, setTxHash] = React.useState("");
  const [insufficientBal, setinsufficientBal] = React.useState(false);
  // const [network, setNetwork] = React.useState(true);
  const [delegationClicked, setDelegationClicked] = React.useState(false);
  const [refetchVotes, setRefetchVotes] = React.useState(false);
  const [votesDelegated, setVotesDelegated] = React.useState("0");
  const [pendingTx, setPendingTx] = React.useState(false);
  const [confirmedTx, setConfirmedTx] = React.useState(false);

  const [
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    contracts,
    accounts,
    networkId,
  ] = useWeb3Modal();

  const [addrWithVotes, setAddrWithVotes]: any[] = React.useState([]);

  const [page, setPage]: any[] = React.useState(0);

  // const [totalVotes, setTotalVotes]: any = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleCloseDelegate = () => {
    setOpen(false);
    setinsufficientBal(false);
    // setOpenDelegate(false);
    setDelegationClicked(false);
  };
  const handleConfirmClose = () => {
    setOpen(false);
    setConfirmTx(false);
    setPendingTx(false);
    setDelegationClicked(false);
    setConfirmedTx(false);
  };

  // const openNotifyPopup = () => {
    // setNetwork(true);
  // };
  // const closeNotifyPopup = () => {
    // setNetwork(false);
  // };

  const handleWallet = () => {
    if (!provider) {
      loadWeb3Modal();
    } else {
      logoutOfWeb3Modal();
    }
  };
  const handleMatchAddress = (address: any) => {
    const data = addrWithVotes.filter(
      (item: any) => item.id.toLowerCase() === address.toLowerCase()
    );

    if (data.length > 0) {
      const voteWeight = (data[0].delegatedVotes / totalTokenSupply) * 100;
      return voteWeight;
    } else {
      return 0;
    }
  };

  const handleDelegateSubmit = async (address: any) => {
    if (contracts !== undefined) {
      try {
        const balance = await contracts.balanceOf(accounts);

        if (balance > 0) {
          const v = Number(balance.toString()) / 10 ** 18;
          const formatedVote = handleIntegerFormat(v);
          setDelegationToAddr(address);
          setDelegationClicked(true);
          setVotesDelegated(formatedVote);
          setConfirmTx(true);
          setOpen(false);
          const tx = await contracts.delegate(address)
          setPendingTx(true);
          setDelegationClicked(false);
          const receipt = await tx.wait();
          setTxHash(receipt.transactionHash);
          setDelegationToAddr(address);
          setRefetchVotes(true);
          setConfirmedTx(true);
          setPendingTx(false);
          setOpen(false);
          setDelegationClicked(false);
        } else {
          setinsufficientBal(true);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const getAllAddresses = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SUBGRAPH_API}`,
        {
          query: `
          {
            delegates(first: 25, skip: ${page * 25}, orderBy: delegatedVotes, orderDirection: desc, where: { delegatedVotes_gt: 0 }) {
              id
              delegatedVotes
            }
          }
              `,
        }
      );
      console.log(data.data.delegates);
      const allDelegators = await Promise.all(data.data.delegates.map(async (item: {
        id: string,
        delegatedVotes: number
      }, key: number) => ({
        no: key + 1 + (page * 25),
        id: item.id,
        ens: await provider?.lookupAddress(item.id),
        name: addressMap[item.id],
        delegatedVotes: item.delegatedVotes
      })));
      
      setAddrWithVotes(allDelegators);

      // const allVotes = data.data.delegates.map(
      //   (item: any) => item.delegatedVotes
      // );
      // const sumOfAllVotes = allVotes.reduce(
      //   (a: any, b: any) => parseInt(a) + parseInt(b),
      //   0
      // );
      // setTotalVotes(sumOfAllVotes);
      return allDelegators;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  };

  const [currentVotes, setCurrentVotes] = React.useState("0");
  const [totalTokenSupply, setTotalTokenSupply] = React.useState(0);
  React.useEffect(() => {
    if (provider !== undefined) {
      setConnected(true);
    }
  }, [provider]);
  React.useEffect(() => {
    if (contracts !== undefined) {
      contracts.totalSupply()
        .then((res: any) => {
          const bal = Number(res.toString()) / 10 ** 18;
          setTotalTokenSupply(bal);
        })
        .catch((err: any) => console.log(err));
    }
  }, [contracts]);

  React.useEffect(() => {
    if (contracts !== undefined) {
      contracts.balanceOf(accounts)
        .then((res: any) => {
          const bal = Number(res.toString()) / 10 ** 18;
          const formatedBal = handleNumberFormat(bal);
          setBitBalance(formatedBal);
        })
        .catch((err: any) => {
          console.log(err);
        });

      contracts.getCurrentVotes(accounts)
        .then((res: any) => {
          const bal = Number(res.toString()) / 10 ** 18;
          const formatedVotes = handleIntegerFormat(bal);
          setCurrentVotes(formatedVotes);
        })
        .catch((err: any) => console.log(err));

      contracts.delegates(accounts)
        .then((res: any) => {
          setDelegationToAddr(res);
        })
        .catch((err: any) => console.log(err));
    }
  }, [contracts, accounts, refetchVotes, networkId]);

  React.useEffect(() => {
    getAllAddresses().then((res) => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, refetchVotes, accounts, provider, page]);

  function setupInstructions(){
    return (
      <div className="bg-white p-7">
        <p className="text-2xl mb-4">
          Set Up Voting
        </p>
        <p className="text-gray-500 text-xl">
          You can delegate your votes to a third party here. Delegation can be given to one address at a time. Note that delegation does not lock or transfer tokens. <a href={`${process.env.REACT_APP_BITDAO_DOCS}`} target="_blank" rel="noreferrer" className="underline">
            Learn More.
          </a>
        </p>
        <div className="text-center pt-5">
          <button
            className="btn-primary text-base p-5 w-full max-w-xs"
            onClick={connected ? handleOpen : handleWallet}
            >
            Get Started
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="">
      <div className="max-w-screen-md p-10 mx-auto">
        <header className="flex justify-between items-center p-3 mb-14">
          <h4>
            <img
              alt="BitDAO logo"
              src="logo.svg"
              className="h-16"
            />
          </h4>

          <div>
            <WalletButton
              provider={provider}
              loadWeb3Modal={loadWeb3Modal}
              logoutOfWeb3Modal={logoutOfWeb3Modal}
              accounts={accounts}
            />
          </div>
        </header>


        <div className="my-28">
          <h1 className="font-serif text-black text-center text-5xl my-5 circle-decoration">
            DELEGATE VOTES
          </h1>
          <p className="text-2xl text-center">
            For multisig wallets, see instructions{" "}
            <a
              href={`${process.env.REACT_APP_BITDAO_LEARNMORE}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Here
            </a>
          </p>
        </div>

        <div className="border border-black my-7">

          <div className="py-6 px-7 text-2xl bg-white border-b border-black">Voting Wallet</div>

          <div className="flex p-7 bg-white border-b border-black justify-between">
            <div>
              BIT Balance
            </div>
            <div className="flex items-center">
              {accounts ? (
                <>
                  <span>{bitBalance} </span>
                  <img alt="" src="bitballogo.png" style={{ paddingLeft: "5px" }} />
                </>
              ) : (
                <span>Connect your wallet</span>
              )}
            </div>
          </div>



          {/* if user is not a new user */}
          {delegationToAddr !== "0x0000000000000000000000000000000000000000" &&
          parseInt(bitBalance) > 0 && accounts ? (
            <>
              {delegationToAddr.toLowerCase() === accounts.toLowerCase() &&
              parseInt(bitBalance) === 0 ? null : (
                <div className="flex p-7 bg-white border-b border-black justify-between">
                  <div>
                    Delegating To
                  </div>

                  <div>
                    {accounts !== undefined ? (
                      <>
                        {delegationToAddr.toLowerCase() ===
                        "0x0000000000000000000000000000000000000000" ? (
                          "Undelegated"
                        ) : (
                          <span>
                            {
                              delegationToAddr.toLowerCase() === accounts.toLowerCase()
                              ? "Self"
                              : addressTruncate(delegationToAddr)
                            }
                          </span>
                        )}
                      </>
                    ) : null}
                    &nbsp;
                  </div>

                  <div>
                    <button className="hover:text-current" onClick={handleOpen}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              {delegationToAddr.toLowerCase() ===
              "0x0000000000000000000000000000000000000000" ?
                setupInstructions()
                : (
                <div className="flex p-7 bg-white border-b border-black justify-between">
                  <div>
                    Current Votes
                  </div>
                  <div>
                    {currentVotes}
                  </div>
                  <div>
                    <a
                      href={`${process.env.REACT_APP_BITDAO_SNAPSHOT}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Vote &rarr;
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* if user is new */}
              {/* check for use balance */}
              {Number(bitBalance.replace(/\D/g,'')) > 0 || !accounts ?
                  setupInstructions()
                 : (
                  <div className="py-6 px-7 bg-white">
                    <p className="mb-4">
                      You don't have any BIT in your wallet!
                    </p>
                    <p className="flex items-center justify-center">
                      <a href={`${process.env.REACT_APP_SUSHI_POOL}`}>
                        <button className="btn-primary text-base p-5 w-full max-w-xs">
                          Buy BIT
                        </button>
                      </a>
                    </p>
                  </div>
                )
              }
            </>
          )}
        </div>

        <div className="border border-black">
          <div className="py-6 px-7 text-2xl bg-white border-b border-black">
            Top Addresses by Voting Weight
          </div>
          <DelegateList delegates={addrWithVotes} />
          <div className="flex flex-row justify-between p-6">
            <button onClick={() => setPage(page-1)} disabled={page === 0} className={`btn-primary text-base p-2 ${page === 0 ? 'cursor-default pointer-events-none opacity-70' : ''}`}>Prev Page </button>
            <button onClick={() => setPage(page+1)} className={`btn-primary text-base p-2 ${addrWithVotes.length === 0 ? 'cursor-default pointer-events-none opacity-70' : ''}`}>Next Page</button>
          </div>
        </div>

        {open && (
          <DelegateVoting
            open={open}
            handleClose={handleCloseDelegate}
            handleDelegateSubmit={handleDelegateSubmit}
            ownAccount={accounts}
            handleMatchAddress={handleMatchAddress}
            insufficientBal={insufficientBal}
            delegationClicked={delegationClicked}
            provider={provider}
          />
        )}
        {!open && confirmTx && (
          <ConfiramtionPopup
            open={confirmTx}
            handleClose={handleConfirmClose}
            delegatingToAddr={delegationToAddr}
            txHash={txHash}
            votesDelegated={votesDelegated}
            delegationClicked={delegationClicked}
            pendingTx={pendingTx}
            confirmedTx={confirmedTx}
          />
        )}
      </div>
    </div>
  );
}

export default Governance;
