import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

type ModalProps = {
  open: any;
  handleClose: any;

  delegatingToAddr: any;
  txHash:any;votesDelegated:any;
  delegationClicked:any;
  pendingTx:any;confirmedTx:any;
};

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    fontFamily: "ABeeZeeRegular !important",
    borderRadius: "16px",
    position: "relative",
    right: 0,
    bottom: 0,
    top: '20%',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    // backgroundImage: "linear-gradient(to  top, #ECF8FF, #FFF6F8)"
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    ["@media (maxWidth:414px)"]: {
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
    paddingLeft: "150px",
    color: "#E84F7D",
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
    fontFamily: "ABeeZeeRegular !important",
    marginTop:"5px",
    "& a":{
        color:"#ffffff",
        fontFamily: "ABeeZeeRegular !important",
        textDecoration:"none"
    }
  },
  closeButton: {
    position: "absolute",
    right: "24px",
    color: "#CCCCCC",
    fontWeight: 400,
    cursor: "pointer",

  },
  msgLabel: {
    fontSize: "12px",
    color: "#E84F7D",
    margin: "0px",
  },
  
  delegateVoteHead: {
    textAlign: "center",
    fontWeight: 400,
    padding: "25px",
    color: "#1049F0",
    fontSize: "24px",
    borderRadius: "15px 15px 0px 0px",
    boxShadow: "inset 0px -1px 0px #ECECEC",
 
    backgroundImage: "linear-gradient(to  top, #ffffff, #FFF7F8)",
  },
}));
function ConfiramtionPopup({
  open,
  handleClose,
  delegatingToAddr,
  txHash,
  votesDelegated,
  delegationClicked,
  pendingTx,confirmedTx
}: ModalProps) {
  const classes = useStyles();  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.heading}>
            <Paper className={classes.delegateVoteHead}>
              {" "}
              {pendingTx?'Transaction Pending':(<>{confirmedTx?'Transaction Confirmed':'Confirm Transaction'}</>)}
              <span
                className={classes.closeButton}
                onClick={handleClose}
              >
                x
              </span>
            </Paper>
          </Grid>
        </Grid>

        <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
        <Grid container spacing={3} className={classes.plr}>
          <Grid item xs={12} style={{ padding: "30px" }}>
            <p style={{ textAlign: "center", color:"#1049F0" }}>{votesDelegated} Votes</p>
            <p style={{ textAlign: "center" }}>
              Delegating to{" "}
              {delegatingToAddr.slice(0, 4) +
                "..." +
                delegatingToAddr.slice(-4)}{" "}
            </p>
            <p style={{ textAlign: "center" }}>

              {confirmedTx?( <CheckCircleIcon style={{color:"green",fontSize:'35px'}}/>):(

                <img src={process.env.REACT_APP_CLOUDFRONT + "balLogo.png"} style={{width:'45px'}}/>
              )}
           
            </p>
            <p style={{ textAlign: "center",color: "#919191", fontSize:"14px"}}>
              {delegationClicked?'Confirm the transaction':'Transaction Broadcast'}
            </p>
            
            {pendingTx && (
              <p>
              <button className={classes.delegateButton}>
                <a href={`${process.env.REACT_APP_ETHERSCAN}${txHash}`} target="_blank">View on Etherscan</a>
              </button>
            </p>
            )}
            {confirmedTx && (
              <p>
              <button className={classes.delegateButton}>
                <a href={`${process.env.REACT_APP_ETHERSCAN}${txHash}`} target="_blank">View on Etherscan</a>
              </button>
            </p>
            )}

            
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ConfiramtionPopup;
