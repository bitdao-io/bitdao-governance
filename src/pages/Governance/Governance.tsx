import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout'
import useWeb3Modal from "../../hooks/useWeb3Modal";
import WalletButton from "../../components/WalletButton";
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import axios from "axios";
import DelegateVoting from "./Components/DelegateVoting";
import ConfiramtionPopup from "./Components/ConfirmationPopup";
import NotifyPopup from "./Components/NotifyPopup";
import * as IMAGES from '../../constant/Images'

export default function Factor(): JSX.Element {
    const [open, setOpen] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [newUser, setNewUser] = useState(true);
    const [network, setNetwork] = useState(false);
    const [confirmTx, setConfirmTx] = useState(false);
    const [pendingTx, setPendingTx] = useState(false);
    const [connected, setConnected] = useState(false);
    const [confirmedTx, setConfirmedTx] = useState(false);
    const [bitBalance, setBitBalance]: any = useState("0");
    const [openDelegate, setOpenDelegate] = useState(false);
    const [refetchVotes, setRefetchVotes] = useState(false);
    const [votesDelegated, setVotesDelegated] = useState("0");
    const [totalTokenSupply, setTotalTokenSupply] = useState(0);
    const [currentVotes, setCurrentVotes] = React.useState("0");
    const [delegationToAddr, setDelegationToAddr] = useState("");
    const [insufficientBal, setinsufficientBal] = useState(false);
    const [addrWithVotes, setAddrWithVotes]: any[] = useState([]);
    const [delegationClicked, setDelegationClicked] = useState(false);
    const [provider, loadWeb3Modal, logoutOfWeb3Modal, contracts, accounts, networkId] = useWeb3Modal();

    // const [totalVotes, setTotalVotes]: any = React.useState(0);
    // const [currentVotes, setCurrentVotes] = React.useState("0");

    const handleOpen = () => {
        setOpen(true);
    };

    const openNotifyPopup = () => {
        setNetwork(true)
    }

    const closeNotifyPopup = () => {
        setNetwork(false)
    }

    const handleWallet = () => {
        if (!provider) {
            loadWeb3Modal();
        } else {
            logoutOfWeb3Modal();
        }
    }

    const handleCloseDelegate = () => {
        setOpen(false);
        setinsufficientBal(false)
        setOpenDelegate(false);
        setDelegationClicked(false)
    };

    const handleConfirmClose = () => {
        setOpen(false);
        setConfirmTx(false);
        setPendingTx(false);
        setDelegationClicked(false);
        setConfirmedTx(false)
    };

    const getDisplayBitBalance = (): number => {
        if (bitBalance.indexOf('.') && bitBalance.indexOf('.') > 0) {
            return bitBalance.slice(0, -4)
        }
        return bitBalance
    }

    const handleMatchAddress = (address: any) => {
        const data = addrWithVotes.filter((item: any) => item.id.toLowerCase() == address.toLowerCase());
        return (data.length > 0 ? ((data[0].delegatedVotes / totalTokenSupply) * 100) : (0))
    };

    const handleNumberFormat = (number: any) => {
        const splitbal = number.toString().split(".")
        const toformatfun = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
        const toformat = toformatfun.format(Number(splitbal[0]));
        return (splitbal[1] == undefined ? (toformat.toString().split(".")[0].split("$")[1]) : (toformat.toString().split(".")[0].split("$")[1] + "." + splitbal[1]))
    }

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
            const allDelegators = data.data.delegates;
            setAddrWithVotes(allDelegators);
            const allVotes = data.data.delegates.map((item: any) => item.delegatedVotes);
            const sumOfAllVotes = allVotes.reduce((a: any, b: any) => parseInt(a) + parseInt(b), 0)
            const changeDis = allDelegators.map((item: any) => item.id.toLowerCase() == accounts.toLowerCase())

            if (!changeDis.includes(true)) {
                setNewUser(true);
            } else {
                setNewUser(false);
            }
            return allDelegators;


        } catch (error) {
            console.log(error.message);
            return [];
        }
    };

    const generateTopAddressList = () => {
        return (addrWithVotes.map((row: any, index: any) => {
            return (
                <div className='grid grid-cols-2 text-lg text-black border-b'>
                    <a
                        href={`${process.env.REACT_APP_ETHERSCAN_ADDRESS}${row.id}`}
                        target="_blank"
                        className='flex flex-row py-8 pl-20 '
                    >
                        <text>{index + 1}</text>
                        <img
                            src={IMAGES.User}
                            className='w-6 mx-3'
                        />
                        <text>
                            {row.id.slice(0, 5) +
                                "..." +
                                row.id.slice(-5)}
                        </text>

                    </a>

                    <div className='pl-20 text-lg my-auto'>
                        {handleNumberFormat(row.delegatedVotes)}

                    </div>
                </div>
            )
        }))
    }

    const handleDelegateSubmit = async (address: any) => {
        if (contracts != undefined) {
            try {
                const balance = await contracts.methods.balanceOf(accounts).call();
                // console.log(process.env.REACT_APP_NETWORK_ID)        

                if (balance > 0) {
                    const v = Number(balance.toString()) / 10 ** 18;
                    const formatedVote = handleNumberFormat(v);
                    setDelegationToAddr(address);
                    setDelegationClicked(true)
                    setVotesDelegated(formatedVote);
                    setConfirmTx(true);
                    setOpen(false);
                    const receipt = contracts.methods.delegate(address).send({ from: accounts, gas: 300000 }).on("transactionHash", async (txhash: string) => {
                        setPendingTx(true);
                        setDelegationClicked(false);
                        setTxHash(txhash);
                    }).on('receipt', function (receipt: any) {
                        console.log('confirmation', receipt)
                        setPendingTx(false)
                        setConfirmedTx(true)
                        setOpen(false);
                        setDelegationClicked(false);
                        setDelegationToAddr(address);
                        setRefetchVotes(true);

                    }).on('error', () => {
                        setOpen(false);
                        setConfirmTx(false);
                        setConfirmedTx(false)
                        setDelegationClicked(false);
                        setPendingTx(false)
                    })
                }
                else {
                    console.log('insufficient balance')
                    setinsufficientBal(true);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    useEffect(() => {
        if (provider != undefined) {
            setConnected(true);
        }
    }, [provider]);

    useEffect(() => {
        getAllAddresses().then(res => { })

    }, [connected, refetchVotes]);

    useEffect(() => {
        if (contracts != undefined) {
            contracts.methods.totalSupply().call().then((res: any) => {
                const bal = Number(res.toString()) / 10 ** 18;
                setTotalTokenSupply(bal);
            }).catch((err: any) => console.log(err))
        }
    }, [contracts]);

    useEffect(() => {
        if (contracts != undefined) {
            contracts.methods.balanceOf(accounts).call().then((res: any) => {
                const bal = Number(res.toString()) / 10 ** 18;
                const formatedBal = handleNumberFormat(bal);
                setBitBalance(formatedBal);
            }).catch((err: any) => { console.log(err) })
            contracts.methods.getCurrentVotes(accounts).call().then((res: any) => {
                const bal = Number(res.toString()) / 10 ** 18;
                const formatedVotes = handleNumberFormat(bal);
                setCurrentVotes(formatedVotes);
            }).catch((err: any) => console.log(err))
            contracts.methods.delegates(accounts).call().then((res: any) => {
                setDelegationToAddr(res);
            }).catch((err: any) => console.log(err))
        }
    }, [contracts, accounts, refetchVotes]);


    return (
        <div className={styles.root}>
            {/* header part */}
            <div className='grid grid-cols-2 py-10'>
                <div className='mx-auto'>
                    <Link to='/'>
                        <img className='w-11rem ' src={IMAGES.BitDao} />
                    </Link>
                </div>
                <div className='mx-auto my-auto'>
                    <WalletButton
                        provider={provider}
                        loadWeb3Modal={loadWeb3Modal}
                        logoutOfWeb3Modal={logoutOfWeb3Modal}
                        accounts={accounts}
                    />
                </div>
            </div>
            {/* body part */}
            <div className='flex flex-col w-1/2 mx-auto py-20 min-w-490px'>
                {/* 主标题 */}
                <div className=' text-center flex flex-col mb-10'>
                    <text className='text-blue font-normal text-5xl mb-2'>DELEGATE VOTES</text>

                    <text className='text-2xl'>For multisig wallets, see instructions
                        <a
                            href={`${process.env.REACT_APP_BITDAO_LEARNMORE}`}
                            target="_blank"
                        >
                            <text className='text-2xl text-red'> Here.</text>
                        </a>
                    </text>
                </div>
                <Card>
                    {/* 钱数显示 */}
                    <div className='px-9 py-8'>
                        <text className={styles.subSectionTitle}>Voting Wallet</text>
                    </div>
                    <hr />
                    <div className='flex flex-row px-9 py-10'>
                        <text className='text-lightBlue text-lg'> BIT Balance</text>
                        <text className='ml-32 mr-5 font-mono text-2xl'>
                            {accounts == undefined ? ('-') : (getDisplayBitBalance())}
                        </text>
                        <img src={IMAGES.BitDaoLogo} className='w-7'/>
                    </div>
                    <hr />
                    {!newUser ? (
                        <div>
                            <div className='grid grid-cols-3 px-9 py-10'>
                                <text className='text-lightBlue text-lg'> Delegating to</text>
                                {accounts != undefined ? (
                                    <>
                                        {delegationToAddr.toLowerCase() == "0x0000000000000000000000000000000000000000" ? (
                                            "Undelegated"
                                        ) : (
                                            <div className='pl-7 text-lg'>
                                                {delegationToAddr.toLowerCase() == accounts.toLowerCase()
                                                    ? "Self"
                                                    : delegationToAddr.slice(0, 4) +
                                                    "..." +
                                                    delegationToAddr.slice(-4)}
                                            </div>
                                        )}
                                    </>
                                ) : null}

                                <button className='pl-16 font-mono text-2xl text-red' onClick={() => { handleOpen() }}>
                                    <text>Change</text>
                                </button>
                            </div>
                            <hr />
                            <div className='grid grid-cols-3 px-9 py-10'>
                                <text className='text-lightBlue text-lg'> Votes Recieved</text>
                                <div className='pl-7'>
                                    {currentVotes.indexOf('.') && currentVotes.indexOf('.') > 0 ? (
                                        <>
                                            <span className={styles.subSectionTitle}>{currentVotes.slice(0, -4)}</span>
                                            <span className={styles.subSectionTitle} style={{ color: "#919191" }}>
                                                {currentVotes.slice(-4)}
                                            </span>
                                        </>
                                    ) : <text  className={styles.subSectionTitle}>{currentVotes}</text>}
                                </div>

                                <a href={`${process.env.REACT_APP_BITDAO_SNAPSHOT}`} target="_blank">
                                    {currentVotes.length == 1 ? <span className='text-skyBlue text-2xl font-mono pl-24'>Vote &rarr;</span> : <span>Vote &rarr;</span>}
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className='font-mono flex flex-col px-9 py-4'>
                            <text className={styles.subSectionTitle}>
                                Setup Voting
                            </text>
                            <text className='mt-5 text-lg text-gray'>
                                You can either vote or create proposals yourself or delegate your
                                votes to a thrid party. Delegation can be given to one address at
                                a time. Note that delegation does not lock or transfer tokens.
                            </text>
                            <a
                                href={`${process.env.REACT_APP_BITDAO_DOCS}`}
                                target="_blank"
                            >
                                <text className='text-lg text-red'> Learn More.</text>
                            </a>
                            <button className='mx-auto bg-red rounded-xl py-5 my-3 shadow-2xl w-2/3' onClick={connected ? handleOpen : handleWallet}>
                                <text className='text-white font-mono text-2xl'>Get Started</text>
                            </button>
                        </div>
                    )}

                </Card>
                <Card>
                    <div className='px-2 py-6'>
                        <text className={styles.subSectionTitle}>Top Addresses by Voting Weight</text>
                    </div>
                    <hr />
                    <div className='grid grid-cols-2 py-4'>
                        <text className='text-lg text-lightBlue pl-20'>Rank</text>
                        <text className='text-lg text-lightBlue pl-20'>Votes</text>
                    </div>
                    <hr />
                    {generateTopAddressList()}
                </Card>
            </div>
            { open && (
                <DelegateVoting
                    open={open}
                    handleClose={handleCloseDelegate}
                    handleDelegateSubmit={handleDelegateSubmit}
                    ownAccount={accounts}
                    handleMatchAddress={handleMatchAddress}
                    insufficientBal={insufficientBal}
                    delegationClicked={delegationClicked}
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
            {network && (
                <NotifyPopup open={openNotifyPopup} handleClose={closeNotifyPopup} text={`Please switch to mainnet`} />
            )}
        </div>
    )
}

const styles = {
    root:'w-full bg-gradient-to-r from-pageStart to-pageEnd',
    subSectionTitle : 'font-mono text-2xl'
}