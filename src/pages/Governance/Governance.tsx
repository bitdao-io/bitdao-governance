import React from "react";
import axios from "axios";

import WalletButton from "../../components/WalletButton";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import DelegateVoting from "./DelegateVoting";
import ConfiramtionPopup from "./ConfirmationPopup";
import DelegateList from "./DelegateList";
import handleNumberFormat from "../../helpers/handleNumberFormat";
import addressTruncate from "../../helpers/addressTruncate";
import NotifyPopup from "../../components/NotifyPopup";

function Governance() {
  const [connected, setConnected] = React.useState(false);
  const [bitBalance, setBitBalance]: any = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [openDelegate, setOpenDelegate] = React.useState(false);
  const [confirmTx, setConfirmTx] = React.useState(false);
  const [delegationToAddr, setDelegationToAddr] = React.useState("");
  const [txHash, setTxHash] = React.useState("");
  const [insufficientBal, setinsufficientBal] = React.useState(false);
  const [network, setNetwork] = React.useState(true);
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

  const [totalVotes, setTotalVotes]: any = React.useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelegate = () => {
    setOpen(false);
    setinsufficientBal(false);
    setOpenDelegate(false);
    setDelegationClicked(false);
  };
  const handleConfirmClose = () => {
    setOpen(false);
    setConfirmTx(false);
    setPendingTx(false);
    setDelegationClicked(false);
    setConfirmedTx(false);
  };

  const openNotifyPopup = () => {
    setNetwork(true);
  };
  const closeNotifyPopup = () => {
    setNetwork(false);
  };
  // const handleDelegateVoting = () => {
  //   setOpen(false);
  //   setOpenDelegate(true);
  //   setManualVoting(false);
  // };
  // const handleManualVoting = () => {
  //   setManualVoting(true);
  //   setOpen(false);
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
          const formatedVote = handleNumberFormat(v);
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

            // .on("transactionHash", async (txhash: string) => {
            //   setPendingTx(true);
            //   setDelegationClicked(false);
            //   setTxHash(txhash);
            // })
            // .on("receipt", function (receipt: any) {
            //   setDelegationToAddr(address);
            //   setRefetchVotes(true);
            //   setConfirmedTx(true);
            //   setPendingTx(false);
            //   setOpen(false);
            //   setDelegationClicked(false);
            // })
            // .on("error", () => {
            //   setOpen(false);
            //   setConfirmTx(false);
            //   setConfirmedTx(false);
            //   setDelegationClicked(false);
            //   setPendingTx(false);
            // });
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
            delegates(first: 15, orderBy: delegatedVotes, orderDirection: desc) {
              id
              delegatedVotes
            }
          }
              `,
        }
      );
      const allDelegators = data.data.delegates.filter(
        (b: any) => b.delegatedVotes !== 0
      );
      setAddrWithVotes(allDelegators);

      const allVotes = data.data.delegates.map(
        (item: any) => item.delegatedVotes
      );
      const sumOfAllVotes = allVotes.reduce(
        (a: any, b: any) => parseInt(a) + parseInt(b),
        0
      );
      setTotalVotes(sumOfAllVotes);
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
          const formatedVotes = handleNumberFormat(bal);
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
  }, [connected, refetchVotes, accounts]);

  function setupInstructions(){
    return (
      <div className="bg-white p-7 rounded-b-2xl">
        <p className="text-2xl mb-4">
          Set Up Voting
        </p>
        <p className="text-gray-500 text-xl">
          You can delegate your votes to a third party here. Delegation can be given to one address at a time. Note that delegation does not lock or transfer tokens. <a href={`${process.env.REACT_APP_BITDAO_DOCS}`} target="_blank" rel="noreferrer" className="text-brandpink">
            Learn More.
          </a>
        </p>
        <div className="text-center pt-5">
          <button
            className="bg-brandpink rounded-2xl text-white text-base p-5 w-full max-w-xs"
            onClick={connected ? handleOpen : handleWallet}
            >
            Get Started
          </button>
        </div>
        
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-brandblue-light to-brandpink-light">
      <div className="max-w-screen-md p-10 mx-auto">
        <header className="flex justify-between items-center">
          <h4>
            <img
              alt="BitDAO logo"
              src={process.env.REACT_APP_CLOUDFRONT + "bitlogo.png"}
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
        

        <div>
          <h1 className="font-serif text-brandblue text-center text-5xl my-5">
            DELEGATE VOTES
          </h1>
          <p className="text-2xl text-center">
            For multisig wallets, see instructions{" "}
            <a
              href={`${process.env.REACT_APP_BITDAO_LEARNMORE}`}
              target="_blank"
              rel="noreferrer"
              className="text-brandpink"
            >
              Here
            </a>
          </p>
        </div>

        <div className="shadow rounded-2xl my-7">
          
          <div className="py-6 px-7 text-2xl rounded-t-2xl bg-white border-b border-opacity-40">Voting Wallet</div>
          
          <div className="flex p-7 bg-white border-b border-opacity-40 justify-between">
            <div>
              BIT Balance
            </div>
            <div className="flex items-center">
              {accounts ? (
                <>
                  <span>{bitBalance} </span>
                  <img alt="" src={process.env.REACT_APP_CLOUDFRONT + "bitballogo.png"} style={{ paddingLeft: "5px" }} />
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
                <div className="flex p-7 bg-white border-b border-opacity-40 justify-between">
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
                    <button className="text-brandpink hover:text-current" onClick={handleOpen}>
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
                <div className="flex p-7 bg-white border-b border-opacity-40 justify-between rounded-b-2xl">
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
                      className="text-skyBlue"
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
                  <div className="py-6 px-7 shadow rounded-b-2xl bg-white">
                    <p className="mb-4">
                      You don't have any BIT in your wallet!
                    </p>
                    <p className="flex items-center justify-center">
                      <a href={`${process.env.REACT_APP_SUSHI_POOL}`}>
                        <button className="bg-brandpink rounded-2xl text-white text-base p-5 w-full max-w-xs">
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

        <div>
          <div className="py-6 px-7 text-2xl shadow rounded-t-2xl bg-white border-b">
            Top Addresses by Voting Weight
          </div>
          <DelegateList delegates={addrWithVotes} />
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
        {confirmTx && (
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
