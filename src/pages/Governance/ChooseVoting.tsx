import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
declare let window: any;

type ModalProps = {
  open: any;
  handleClose: any;
  handleDelegateVoting: any;
  handleManualVoting: any;
};
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 30;
  const left = 42;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  modal: {
    fontFamily: "SpaceGroteskRegular !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    fontFamily: "SpaceGroteskRegular !important",
    //computer
    [theme.breakpoints.up('lg')]: {
     
    },
    //iphone
    [theme.breakpoints.down('sm')]: {
      top: '65vw',
      left: '35vw'
    },
    borderRadius: "16px",
    position: "absolute",
    top: '65vw',
      left: '35vw',
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    ['@media (maxWidth:414px)']: {
      width:300
    },
    // padding: theme.spacing(2, 4, 3),
  },
  heading: {
    fontFamily: "SpaceGroteskBold !important",
    padding: "0px 20px 0px 20px",
    color: "#1049F0",
    fontSize: "18px",
  },
  icon: {
    border: "1px dotted #0E47EF",
    textAlign: "center",
    borderRadius: "100%",
    padding: "25px",
    backgroundImage: "linear-gradient(to top, #ffffff, #FFF6F8)",
    ['@media (maxWidth:414px)']: {
      padding:'15px'
    },
  },
  iconSize1:{
    ['@media (maxWidth:414px)']: {
      width:'25px',
      position:'absolute',
      top:'76px',
      left:'25px'
    },
  },
  iconSize2:{
    ['@media (maxWidth:414px)']: {
      width:'25px',
      position:'absolute',
      top:'224px',
      left:'25px'
    },
  },
  plr: {
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  arrow: {
    marginTop: "50px",
    color: "#CCCCCC",
    cursor: "pointer",
  },textSize:{
      fontSize:'15px',
      cursor:"pointer"
  },
  closeButton:{
    position:'absolute',
    right:'20px',
    color:'#CCCCCC',
    fontWeight:400,
    cursor:'ponter'
  }
}));
function ChooseVoting({ open, handleClose, handleDelegateVoting, handleManualVoting }: ModalProps) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [winSize, setWinSize] = React.useState(0);

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
            <h3 className={classes.heading}>Choose Delegation Voting
            <span style={{cursor:'pointer'}}className={classes.closeButton} onClick={handleClose}>x</span>
            </h3>
          </Grid>
        </Grid>

        <div style={{ borderTop: "1px solid #CCCCCC" }}></div>
        {/*<Grid container spacing={3} className={classes.plr}>
           <Grid item xs={2} sm={3}>
            <p className={classes.icon}>
              <img className={classes.iconSize1}src="/thumb.png" />
            </p>
          </Grid> 
          {/* <Grid item xs={8} sm={8}>
            <p onClick={handleManualVoting}>
              <strong>Manual Voting</strong>
            </p>
            <p className={classes.textSize} onClick={handleManualVoting}>
              This option allows you to vote on proposals directly from your
              connected wa  llet.
            </p>
          </Grid> 
          {/* <Grid item xs={1} sm={1}>
            <p className={classes.arrow} onClick={handleManualVoting}>{">"}</p>
          </Grid>
        </Grid> */}
        <Grid container spacing={3} className={classes.plr}>
          <Grid item xs={2} sm={3}>
            <p className={classes.icon}>
              <img className={classes.iconSize2}src={process.env.REACT_APP_CLOUDFRONT + "send.png"} />
            </p>
          </Grid>
          <Grid item xs={8} sm={8}>
            <p onClick={handleDelegateVoting} style={{fontFamily: "SpaceGroteskBold"}}>
              <strong>Delegate Voting</strong>
            </p>
            <p className={classes.textSize} onClick={handleDelegateVoting}>
              This options allows you to delegate your votes to another Ethereum
              address. You never send BIT, only your voting rights, and can
              undelegate at any time.
            </p>
          </Grid>
          <Grid item xs={1} sm={1}>
            <p className={classes.arrow} onClick={handleDelegateVoting}>{">"}</p>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}

export default ChooseVoting;
