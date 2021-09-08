import React from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Container, Toolbar, AppBar } from "@material-ui/core";
import WalletButton from "../../components/WalletButton/WalletButton";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import DelegateVoting from "./DelegateVoting";
import ConfiramtionPopup from "./ConfirmationPopup";
import NotifyPopup from "./NotifyPopup";
import useStyles from "./Governance.styles";

function createData(
  Rank: string,
  EnsAddr: string,
  Votes: string,
  VoteWeight: string,
  ProposalsVoted: string
) {
  return { Rank, EnsAddr, Votes, VoteWeight, ProposalsVoted };
}

function Governance({}) {
  const classes = useStyles();

  const [arrayLength, setArrayLength] = React.useState(15);
  const [connected, setConnected] = React.useState(false);
  const [bitBalance, setBitBalance]: any = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [openDelegate, setOpenDelegate] = React.useState(false);
  const [confirmTx, setConfirmTx] = React.useState(false);
  const [delegationToAddr, setDelegationToAddr] = React.useState("");
  const [txHash, setTxHash] = React.useState("");
  const [newUser, setNewUser] = React.useState(true);
  const [insufficientBal, setinsufficientBal] = React.useState(false);
  const [network, setNetwork] = React.useState(false);
  const [delegationClicked, setDelegationClicked] = React.useState(false);
  const [refetchVotes, setRefetchVotes] = React.useState(false);
  const [votesDelegated, setVotesDelegated] = React.useState("0");
  const [pendingTx, setPendingTx] = React.useState(false);
  const [confirmedTx, setConfirmedTx] = React.useState(false);
  const [allAddressesWithVotes, setAllAddressesWithVotes]: any = React.useState(
    []
  );
  const [addressesWithDelegates, setAddressesWithDelegates]: any =
    React.useState([]);
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
      (item: any) => item.id.toLowerCase() == address.toLowerCase()
    );

    if (data.length > 0) {
      const voteWeight = (data[0].delegatedVotes / totalTokenSupply) * 100;
      return voteWeight;
    } else {
      return 0;
    }
  };

  const handleNumberFormat = (number: any) => {
    const splitbal = number.toString().split(".");
    const toformatfun = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const toformat = toformatfun.format(Number(splitbal[0]));
    if (splitbal[1] == undefined) {
      const formatedBal = toformat.toString().split(".")[0].split("$")[1];
      return formatedBal;
    } else {
      const formatedBal =
        toformat.toString().split(".")[0].split("$")[1] + "." + splitbal[1];

      return formatedBal;
    }
  };
  const handleDelegateSubmit = async (address: any) => {
    if (contracts != undefined) {
      try {
        const balance = await contracts.methods.balanceOf(accounts).call();

        if (balance > 0) {
          const v = Number(balance.toString()) / 10 ** 18;
          const formatedVote = handleNumberFormat(v);
          setDelegationToAddr(address);
          setDelegationClicked(true);
          setVotesDelegated(formatedVote);
          setConfirmTx(true);
          setOpen(false);
          const receipt = contracts.methods
            .delegate(address)
            .send({ from: accounts, gas: 300000 })
            .on("transactionHash", async (txhash: string) => {
              setPendingTx(true);
              setDelegationClicked(false);
              setTxHash(txhash);
            })
            .on("receipt", function (receipt: any) {
              setPendingTx(false);
              setConfirmedTx(true);
              setOpen(false);
              setDelegationClicked(false);
              setDelegationToAddr(address);
              setRefetchVotes(true);
            })
            .on("error", () => {
              setOpen(false);
              setConfirmTx(false);
              setConfirmedTx(false);
              setDelegationClicked(false);
              setPendingTx(false);
            });
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
        (b: any) => b.delegatedVotes != 0
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

      const changeDis = allDelegators.map(
        (item: any) => item.id.toLowerCase() == accounts.toLowerCase()
      );

      if (!changeDis.includes(true)) {
        setNewUser(true);
      } else {
        setNewUser(false);
      }
      return allDelegators;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  };

  const [currentVotes, setCurrentVotes] = React.useState("0");
  const [totalTokenSupply, setTotalTokenSupply] = React.useState(0);
  React.useEffect(() => {
    if (provider != undefined) {
      setConnected(true);
    }
  }, [provider]);
  React.useEffect(() => {
    if (contracts != undefined) {
      contracts.methods
        .totalSupply()
        .call()
        .then((res: any) => {
          const bal = Number(res.toString()) / 10 ** 18;
          setTotalTokenSupply(bal);
        })
        .catch((err: any) => console.log(err));
    }
  }, [contracts]);

  React.useEffect(() => {
    if (contracts != undefined) {
      contracts.methods
        .balanceOf(accounts)
        .call()
        .then((res: any) => {
          const bal = Number(res.toString()) / 10 ** 18;
          const formatedBal = handleNumberFormat(bal);
          setBitBalance(formatedBal);
        })
        .catch((err: any) => {
          console.log(err);
        });

      contracts.methods
        .getCurrentVotes(accounts)
        .call()
        .then((res: any) => {
          const bal = Number(res.toString()) / 10 ** 18;
          const formatedVotes = handleNumberFormat(bal);
          setCurrentVotes(formatedVotes);
        })
        .catch((err: any) => console.log(err));

      contracts.methods
        .delegates(accounts)
        .call()
        .then((res: any) => {
          setDelegationToAddr(res);
        })
        .catch((err: any) => console.log(err));
    }
  }, [contracts, accounts, refetchVotes]);

  React.useEffect(() => {
    getAllAddresses().then((res) => {});
  }, [connected, refetchVotes]);

  return (
    <Grid container spacing={4} className={classes.root}>
      <Container className={classes.rootContainer}>
        <Grid item lg={12} md={12}>
          <AppBar
            className={classes.appbar}
            position="static"
            style={{ zIndex: 0 }}
          >
            <Toolbar component="div">
              <Grid item md={6} xs={6}>
                <Typography variant="h4" className={classes.title}>
                  <img src={process.env.REACT_APP_CLOUDFRONT + "bitlogo.png"} />
                </Typography>
              </Grid>
              <Grid item md={6} xs={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                  role="presentation"
                ></div>

                <div className={classes.headercontainer}>
                  <a href="/" className={classes.headerleft}></a>
                  <div className={classes.headerright}>
                    <WalletButton
                      provider={provider}
                      loadWeb3Modal={loadWeb3Modal}
                      logoutOfWeb3Modal={logoutOfWeb3Modal}
                      accounts={accounts}
                    />
                  </div>
                </div>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item md={12} xs={12}>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Typography
                className={classes.heading}
                variant="h1"
                component="h2"
              >
                DELEGATE VOTES
              </Typography>
              <p className={classes.subHeading}>
                For multisig wallets, see instructions{" "}
                <a
                  href={`${process.env.REACT_APP_BITDAO_LEARNMORE}`}
                  target="_blank"
                  className={classes.subHeadingLink}
                >
                  <span className={classes.subHeadingLink}>Here</span>
                </a>
              </p>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={12} xs={12} className={classes.votesWrapper}>
          {bitBalance > 0 && (
            <Paper className={classes.tableHead}>Voting Wallet</Paper>
          )}

          <Paper
            className={`${classes.votingWalletMid} ${
              Number(bitBalance) == 0 && classes.onlyBorder
            }`}
          >
            <Grid
              item
              md={4}
              xs={12}
              className={` ${classes.votingWalletMidText}`}
            >
              BIT Balance
            </Grid>
            <Grid item md={7} xs={12} className={classes.votingWalletMidBal}>
              {accounts == undefined ? (
                <>
                  <span
                    className={classes.messageAlign}
                    style={{ color: "#919191" }}
                  >
                    -
                  </span>{" "}
                  &nbsp;
                  <span
                    className={classes.imageAlign}
                    style={{ marginTop: "-6px" }}
                  >
                    <img
                      src={process.env.REACT_APP_CLOUDFRONT + "balLogo.png"}
                      style={{ height: "27px", paddingLeft: "5px" }}
                    />
                  </span>
                </>
              ) : (
                <>
                  {/* {console.log(bitBalance.match(/.{1,3}/g))} */}
                  {/* replace(/\d(?=(\d{3})+\.)/g, "$&,") */}
                  {bitBalance.indexOf(".") && bitBalance.indexOf(".") > 0 ? (
                    <>
                      <span className={classes.messageAlign}>
                        {bitBalance.slice(0, -4)}
                      </span>
                      <span
                        className={classes.messageAlign}
                        style={{ color: "#919191" }}
                      >
                        {bitBalance.slice(-4)}
                      </span>
                    </>
                  ) : (
                    <span className={classes.messageAlign}>{bitBalance} </span>
                  )}

                  <span
                    className={classes.imageAlign}
                    style={{ marginTop: "1px" }}
                  >
                    <img
                      src={process.env.REACT_APP_CLOUDFRONT + "bitballogo.png"}
                      style={{ height: "16px", paddingLeft: "5px" }}
                    />
                  </span>
                </>
              )}
            </Grid>
            <Grid item md={1} xs={12}></Grid>
          </Paper>

          {!newUser ? (
            <>
              <Paper className={classes.votingWalletMid}>
                <Grid
                  item
                  md={4}
                  xs={4}
                  className={classes.votingWalletMidText}
                >
                  Delegating To
                </Grid>
                <Grid item md={4} xs={4} className={classes.votingWalletMidBal}>
                  {accounts != undefined ? (
                    <>
                      {delegationToAddr.toLowerCase() ==
                      "0x0000000000000000000000000000000000000000" ? (
                        "Undelegated"
                      ) : (
                        <span className={classes.messageAlign}>
                          {delegationToAddr.toLowerCase() ==
                          accounts.toLowerCase()
                            ? "Self"
                            : delegationToAddr.slice(0, 4) +
                              "..." +
                              delegationToAddr.slice(-4)}
                        </span>
                      )}
                    </>
                  ) : null}
                  &nbsp;
                </Grid>
                <Grid item md={4} xs={4} className={classes.votingWalletMidBal}>
                  <p className={classes.addressChangeText} onClick={handleOpen}>
                    <span>
                      <EditIcon style={{ height: "18px" }} />
                    </span>
                  </p>
                </Grid>
              </Paper>
              {delegationToAddr.toLowerCase() ==
              "0x0000000000000000000000000000000000000000" ? (
                <Paper className={classes.votingWalletMidBottom}>
                  <p className={classes.votingWalletMidBottomSetup}>
                    Set Up Voting
                  </p>
                  <p className={classes.votingWalletMidBottomStartText}>
                    You can delegate your votes to a third party here.
                    Delegation can be given to one address at a time. Note that
                    delegation does not lock or transfer tokens.
                    <a
                      href={`${process.env.REACT_APP_BITDAO_DOCS}`}
                      target="_blank"
                      className={classes.subHeadingLink}
                    >
                      <span className={classes.subHeadingLink}>
                        {" "}
                        Learn More.
                      </span>
                    </a>
                  </p>
                  <p className={classes.buttonContainer}>
                    <button
                      className={classes.startButton}
                      onClick={connected ? handleOpen : handleWallet}
                    >
                      Get Started
                    </button>
                  </p>
                </Paper>
              ) : (
                <Paper className={classes.votingWalletMidVotes}>
                  <Grid
                    item
                    md={4}
                    xs={4}
                    className={classes.votingWalletMidText}
                  >
                    Current Votes
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={4}
                    className={classes.votingWalletMidBal}
                  >
                    {currentVotes.indexOf(".") &&
                    currentVotes.indexOf(".") > 0 ? (
                      <>
                        <span className={classes.messageAlign}>
                          {currentVotes.slice(0, -4)}
                        </span>
                        <span
                          className={classes.messageAlign}
                          style={{ color: "#919191" }}
                        >
                          {currentVotes.slice(-4)}
                        </span>
                      </>
                    ) : (
                      <span className={classes.messageAlign}>
                        {currentVotes}
                      </span>
                    )}
                  </Grid>
                  <Grid
                    item
                    md={4}
                    xs={4}
                    className={classes.votingWalletMidBal}
                  >
                    <p className={classes.voteChangeText}>
                      <a
                        href={`${process.env.REACT_APP_BITDAO_SNAPSHOT}`}
                        target="_blank"
                      >
                        {currentVotes.length == 1 ? (
                          <span style={{ color: "#919191" }}>Vote &rarr;</span>
                        ) : (
                          <span>Vote &rarr;</span>
                        )}
                      </a>
                    </p>
                  </Grid>
                </Paper>
              )}
            </>
          ) : (
            <>
              {/* if user is new */}
              {/* check for use balance */}

              {Number(bitBalance) > 0 ? (
                <>
                  <Paper className={classes.votingWalletMidBottom}>
                    <p className={classes.votingWalletMidBottomSetup}>
                      Set Up Voting
                    </p>
                    <p className={classes.votingWalletMidBottomStartText}>
                      You can delegate your votes to a third party here.
                      Delegation can be given to one address at a time. Note
                      that delegation does not lock or transfer tokens.
                      <a
                        href={`${process.env.REACT_APP_BITDAO_DOCS}`}
                        target="_blank"
                        className={classes.subHeadingLink}
                      >
                        <span className={classes.subHeadingLink}>
                          {" "}
                          Learn More.
                        </span>
                      </a>
                    </p>
                    <p className={classes.buttonContainer}>
                      <button
                        className={classes.startButton}
                        onClick={connected ? handleOpen : handleWallet}
                      >
                        Get Started
                      </button>
                    </p>
                  </Paper>
                </>
              ) : (
                <>
                  {connected == false ? (
                    <Paper className={classes.votingWalletMidBottom}>
                      <p className={classes.votingWalletMidBottomSetup}>
                        Set Up Voting
                      </p>
                      <p className={classes.votingWalletMidBottomStartText}>
                        You can delegate your votes to a third party here.
                        Delegation can be given to one address at a time. Note
                        that delegation does not lock or transfer tokens.
                        <a
                          href={`${process.env.REACT_APP_BITDAO_DOCS}`}
                          target="_blank"
                          className={classes.subHeadingLink}
                        >
                          <span className={classes.subHeadingLink}>
                            {" "}
                            Learn More.
                          </span>
                        </a>
                      </p>
                      <p className={classes.buttonContainer}>
                        <button
                          className={classes.startButton}
                          onClick={connected ? handleOpen : handleWallet}
                        >
                          Get Started
                        </button>
                      </p>
                    </Paper>
                  ) : (
                    <>
                      {connected && parseInt(bitBalance) > 0 ? (
                        <Paper className={classes.votingWalletMidBottom}>
                          <p className={classes.votingWalletMidBottomSetup}>
                            Set Up Voting
                          </p>
                          <p className={classes.votingWalletMidBottomStartText}>
                            You can delegate your votes to a third party here.
                            Delegation can be given to one address at a time.
                            Note that delegation does not lock or transfer
                            tokens.
                            <a
                              href={`${process.env.REACT_APP_BITDAO_DOCS}`}
                              target="_blank"
                              className={classes.subHeadingLink}
                            >
                              <span className={classes.subHeadingLink}>
                                {" "}
                                Learn More.
                              </span>
                            </a>
                          </p>
                          <p className={classes.buttonContainer}>
                            <button
                              className={classes.startButton}
                              onClick={connected ? handleOpen : handleWallet}
                            >
                              Get Started
                            </button>
                          </p>
                        </Paper>
                      ) : (
                        <Paper className={classes.votingWalletMidBottom}>
                          <p className={classes.votingWalletMidBottomSetup}>
                            You don't have any BIT in your wallet!
                          </p>
                          <p className={classes.buttonContainer}>
                            <a href={`${process.env.REACT_APP_SUSHI_POOL}`}>
                              <button className={classes.startButton}>
                                Buy BIT
                              </button>
                            </a>
                          </p>
                        </Paper>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Grid>

        <Grid item md={12} xs={12}>
          <Paper className={classes.tableHead}>
            Top Addresses by Voting Weight
          </Paper>
          <TableContainer component={Paper} className={classes.tableContainer}>
            {/* sx={{ minWidth: 650 }} */}
            <Table aria-label="simple table" style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.headtabelCell} align="center">
                    Rank
                  </TableCell>
                  <TableCell className={classes.headtabelCell} align="center">
                    Votes
                  </TableCell>
                  {/* <TableCell className={classes.headtabelCell} align="right">
                      Vote Weight
                    </TableCell> */}
                  {/* <TableCell className={classes.headtabelCell} align="right">
                      Proposals Voted
                    </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* sx={{ "&:last-child td, &:last-child th": { border: 0 } }} */}
                {addrWithVotes.map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tabelCell}
                      align="center"
                    >
                      <a
                        href={`${process.env.REACT_APP_ETHERSCAN_ADDRESS}${row.id}`}
                        target="_blank"
                      >
                        {index + 1}&nbsp;
                        <span className={classes.separator}>|</span> &nbsp;
                        {row.id.slice(0, 5) + "..." + row.id.slice(-5)}
                      </a>
                    </TableCell>
                    <TableCell className={classes.tabelCell} align="center">
                      {Number.isInteger(
                        Number(
                          handleNumberFormat(row.delegatedVotes).replace(
                            /,/g,
                            ""
                          )
                        )
                      )
                        ? handleNumberFormat(row.delegatedVotes)
                        : handleNumberFormat(
                            Number(
                              handleNumberFormat(row.delegatedVotes).replace(
                                /,/g,
                                ""
                              )
                            ).toFixed(2)
                          )}
                    </TableCell>
                    {/* <TableCell className={classes.tabelCell} align="right">
                          {console.log("total votes", totalVotes)}
                          {((row.vote / totalVotes) * 100).toFixed(2)}%
                        </TableCell> */}
                    {/* <TableCell className={classes.tabelCell} align="right" style={{boxShadow: "inset -1px 0px 2px #ECECEC",}}>
                          {row.vote.toFixed(2)}
                        </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {open && (
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
          <NotifyPopup
            open={openNotifyPopup}
            handleClose={closeNotifyPopup}
            text={`Please switch to mainnet`}
          />
        )}
      </Container>
    </Grid>
  );
}

export default Governance;
