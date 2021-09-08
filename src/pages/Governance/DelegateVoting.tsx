import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import useWeb3Modal from "../../hooks/useWeb3Modal";
type ModalProps = {
  open: any;
  handleClose: any;
  handleDelegateSubmit: any;
  ownAccount: any;
  handleMatchAddress: any;
  insufficientBal: any;
  delegationClicked: any;
};

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 35;
  const left = 45;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    ["@media (max-width:414px)"]: {
      top: "30%",
      left: "35%",
    },
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    fontFamily: "ABeeZeeRegular !important",
    borderRadius: "16px",
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    // backgroundImage: "linear-gradient(to  top, #ECF8FF, #FFF6F8)"
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    ["@media (max-width:414px)"]: {
      width: 300,
    },
  },
  heading: {
    fontFamily: "ABeeZeeRegular !important",
    textAlign: "center",
    fontWeight: 400,
    padding: "0px 20px 0px 20px",
    color: "#1049F0",
    fontSize: "24px",
  },
  icon: {
    border: "1px dotted #0E47EF",
    textAlign: "center",
    borderRadius: "100%",
    padding: "25px",
    backgroundImage: "linear-gradient(to top, #ffffff, #FFF6F8)",
  },
  plr: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  arrow: {
    marginTop: "50px",
    color: "#CCCCCC",
    cursor: "pointer",
  },
  delegateHead: {
    display: "flex",
  },
  inputBox: {
    borderRadius: "5px",
    width: "94%",
    padding: "10px",
    height: "20%",
    border: "1px solid #CCCCCC",
  },
  delegaetYousrself: {
    fontFamily: "ABeeZeeRegular !important",
    fontSize: "13px",
    paddingLeft: "145px",
    paddingTop: "4px",
    color: "#E84F7D",
    cursor: "pointer",
  },

  delegateButton: {
    width: "100%",
    padding: "12px",
    color: "#ffffff",
    borderRadius: "10px",
    backgroundColor: "#E84F7D",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "SpaceGroteskRegular !important",
  },
  closeButton: {
    position: "absolute",
    right: "20px",
    color: "#CCCCCC",
    fontWeight: 400,
    cursor: "pointer",
  },
  msgLabel: {
    fontSize: "12px",
    color: "#E84F7D",
    margin: "0px",
  },
  disableButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "#C7D0D8",
    border: "none",
    fontSize: "14px",
    cursor: "pointer",
    color: "#ffffff",
    fontFamily: "SpaceGroteskRegular !important",
  },
  delegateVoteHead: {
    textAlign: "center",
    fontWeight: 400,
    padding: "25px",
    color: "#1049F0",
    fontSize: "24px",
    borderRadius: "15px 15px 0px 0px",
    boxShadow: "inset 0px -1px 0px #ECECEC",
    // background: "linear-gradient(180deg, #FFF7F8 0%, #FFFFFF 12.97%)",
    backgroundImage: "linear-gradient(to  top, #ffffff, #FFF7F8)",
  },
}));
function DelegateVoting({
  open,
  handleClose,
  handleDelegateSubmit,
  ownAccount,
  handleMatchAddress,
  insufficientBal,
  delegationClicked,
}: ModalProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [delegationAddr, setDelegationAddr] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [disable, setDisabled] = React.useState(true);
  const [nameLabel, setNameLabel] = React.useState({
    name: "",
    votingWeight: 0,
    // ensAddr: "",
  });

  const validateAddress = (event: any) => {
    event.preventDefault();
    const addr = event.target.value;

    setDelegationAddr(addr);
    setNameLabel({
      name: "",
      votingWeight: 0,
      // ensAddr: "",
    });
    if (addr.length < 42 || addr.length > 42) {
      setLabel("Invalid Address");
      setDisabled(true);
    } else {
      if (addr == ownAccount) {
        setDelegationAddr(addr);
        const result = handleMatchAddress(addr);
        setLabel("");
        setDisabled(false);
        setNameLabel({
          name: addr == ownAccount ? "You" : addr,
          votingWeight: result.toFixed(4),
          // ensAddr: result[0].EnsAddr,
        });
      } else {
        setDelegationAddr(addr);
        const result = handleMatchAddress(addr);

        setDisabled(false);
        setLabel("");
        setNameLabel({
          name: addr.slice(0, 4) + "..." + addr.slice(-4),
          votingWeight: result.toFixed(4),
          // ensAddr: result[0].EnsAddr,
        });
      }
    }
  };

  const handleOwnDegelationAddr = async () => {
    setDelegationAddr(ownAccount);
    const result = handleMatchAddress(ownAccount);

    setLabel("");
    setDisabled(false);
    setNameLabel({
      name: "You",
      votingWeight: result.toFixed(4),
      // ensAddr: result[0].EnsAddr,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.heading}>
            <Paper className={classes.delegateVoteHead}>
              {" "}
              Delegate Voting
              <span
                style={{ cursor: "pointer" }}
                className={classes.closeButton}
                onClick={handleClose}
              >
                x
              </span>
            </Paper>

            {/* <h3 className={classes.heading}>
              Delegate Voting
              
            </h3> */}
          </Grid>
        </Grid>

        <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
        <Grid container spacing={3} className={classes.plr}>
          <Grid item xs={12}>
            <p>Select an Address</p>
            <p style={{ color: "#919191", fontSize: "14px" }}>
              If you know the address you wish to delegate to, enter it below.
            </p>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: "0px" }}>
            <div className={classes.delegateHead}>
              <p style={{ fontFamily: "ABeeZeeRegular" }}>Delegate Address</p>
              <p
                className={classes.delegaetYousrself}
                onClick={handleOwnDegelationAddr}
              >
                Delegate to yourself
              </p>
            </div>

            <p>
              <input
                className={classes.inputBox}
                placeholder="Enter a 0x address"
                value={delegationAddr}
                onChange={validateAddress}
              />
              <p className={classes.msgLabel}>
                {label}

                {insufficientBal ? (
                  "Insufficient balance to vote"
                ) : (
                  <>
                    {nameLabel.name != "" ? (
                      <>
                        <span style={{ color: "#4FC78D" }}>
                          {nameLabel.name}
                        </span>
                        <span style={{ color: "#919191" }}>
                          {" "}
                          - Voting Weight:{" "}
                          {nameLabel.votingWeight != undefined
                            ? nameLabel.votingWeight
                            : "0"}
                          %
                        </span>
                      </>
                    ) : null}
                  </>
                )}
              </p>
            </p>
            <p>
              <button
                className={
                  disable || delegationClicked
                    ? classes.disableButton
                    : classes.delegateButton
                }
                disabled={disable || delegationClicked}
                onClick={() => handleDelegateSubmit(delegationAddr)}
              >
                {delegationClicked ? "Delegating vote..." : "Delegate Votes"}
              </button>
            </p>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}

export default DelegateVoting;
