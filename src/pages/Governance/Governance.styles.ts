import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      paddingLeft: "300px",
      paddingRight: "300px",

      [theme.breakpoints.down("md")]: {
        paddingLeft: "150px",
        paddingRight: "150px",
      },

      [theme.breakpoints.down("sm")]: {
        paddingLeft: "70px",
        paddingRight: "70px",
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    root: {
      //computer
      [theme.breakpoints.up("lg")]: {},
      //iphone
      [theme.breakpoints.down("sm")]: {
        padding: "5vw",
      },
      flexGrow: 1,
      padding: "40px 70px 0 70px",
      backgroundImage: "linear-gradient(to right, #ECF8FF, #FFF6F8)",
      //   backgroundImage: "linear-gradient(to left, #,#FFFFFF)"
      textAlign: "left",
    },
    heading: {
      //computer
      [theme.breakpoints.up("lg")]: {},
      //iphone
      [theme.breakpoints.down("sm")]: {},
      fontFamily: "SpaceGroteskRegular !important",
      fontSize: "48px",
      fontWeight: "normal",
      margin: "20px",
      marginLeft: "0px",
      letterSpacing: "-1px",
      textAlign: "center",
      color: "#2D82B7",
    },
    connectButton: {
      marginTop: "24px",
      display: "flex",
      justifyContent: "flex-end",
    },
    votingContainer: {
      borderRadius: "16px",
      padding: "15px 30px 15px 30px",

      backgroundImage: "linear-gradient(to  right, #0E47EF, #6288F7)",
    },
    subHeading: {
      fontFamily: "ABeeZeeRegular !important",
      color: "#121212",
      fontWeight: 400,
      fontSize: "24px",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        fontSize: "15px !important",
      },
      
    },
    subHeadingLink: {
      color: "#E84F7D",
      textDecoration: "none",
    },
    subHeading2: {
      fontFamily: "SpaceGroteskRegular !important",
      color: "#121212",
      fontWeight: 400,
      textAlign: "center",
      fontSize: "18px",
    },
    tableHead: {
      marginTop: "20px",
      padding: "22px 30px 22px 30px",
      borderRadius: "15px 15px 0px 0px",
      fontFamily: "ABeeZeeRegular !important",
      color: "#121212",
      fontSize: "24px",
      fontWeight: 400,
      boxShadow: "inset -1px 0px 2px #ECECEC",
    },
    votingWalletMid: {
      padding: "30px",
      borderRadius: "0px 0px 0px 0px",
      fontFamily: "ABeeZeeRegular !important",
      color: "#0E47EF",
      fontSize: "18px",
      fontWeight: 400,
      display: "flex",
      flexGrow: 1,
      boxShadow: "inset -1px 0px 2px #ECECEC",
    },
    votingWalletMidVotes: {
      padding: "30px",
      borderRadius: "0px 0px 15px 15px",
      fontFamily: "ABeeZeeRegular !important",
      color: "#0E47EF",
      fontSize: "18px",
      fontWeight: 400,
      display: "flex",
      flexGrow: 1,
      boxShadow: "inset -1px -4px 2px #ECECEC",
    },
    votingWalletMidText: {
      fontFamily: "SpaceGroteskRegular !important",
      display: "flex",
      justifyContent: "left",
    },
    votingWalletMidBal: {
      color: "#121212",
      display: "flex",
      justifyContent: "center",
    },
    votingWalletMidBottom: {
      borderRadius: " 0px 0px 15px 15px",
      padding: "30px",
      fontFamily: "ABeeZeeRegular !important",
      color: "#0E47EF",
      fontSize: "24px",
      fontWeight: 400,
      textAlign: "left",
      boxShadow: "inset -1px -4px 2px #ECECEC",
    },
    votingWalletMidBottomSetup: {
      marginTop: "0px",
      borderRadius: "0px",
      fontFamily: "ABeeZeeRegular !important",
      color: "#121212",
      fontSize: "24px",
      fontWeight: 400,
    },
    votingWalletMidBottomStartText: {
      color: "#919191",
      fontFamily: "ABeeZeeRegular !important",
      fontSize: "18px",
      fontWeight: 400,
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center !important",
      alignItems: "center",
    },
    startButton: {
      fontFamily: "ABeeZeeRegular !important",
      maxWidth: "419px",
      width: "100%",
      display: "block",
      height: "72px",
      padding: "12px",
      boxShadow: "0px 0px -1px rgba(0, 0, 0, 0.25)",
      borderRadius: "16px",
      color: "#ffffff",
      textAlign: "center",
      fontSize: "18px",
      backgroundColor: "#E84F7D",
      border: "none",
      cursor: "pointer",
    },
    tableContainer: {
      // borderColor:"inherit",
      borderTop: "0.1px solid #E5E5E5",
      borderRadius: "0px 0px 15px 15px",
      boxShadow: "inset -1px -3px 1px #ECECEC",
      fontSize: "2vw",
      marginBottom: "100px",
      fontFamily: "SpaceGroteskRegular !important",
    },
    tableBottom: {
      fontFamily: "SpaceGroteskRegular !important",
      // color: "#121212",
      fontSize: "18px",
      padding: "20px",
      borderRadius: "0px 0px 15px 15px",
      textAlign: "center",
      boxShadow: "inset -1px -4px 2px #ECECEC",
      cursor: "pointer",
      "&:hover": {
        color: "#0E47EF",
      },
    },

    tabelCell: {
      padding: "18px 0px 18px 0px",
      fontFamily: "ABeeZeeRegular !important",

      "& a": {
        textDecoration: "none",
        color: "#121212",
      },
    },
    headtabelCell: {
      padding: "10px 0px 10px 0px",
      color: "#0E47EF",
      fontFamily: "ABeeZeeRegular !important",
    },
    votingWalletContainer: {
      margintTop: "50px !important",
    },
    votingBox: {
      borderRadius: "0px",
      textAlign: "center",
      padding: "40px",
      color: "#0E47EF",
      cursor: "pointer",
    },
    votingBoxImg: { marginLeft: "50px" },
    connectedBox: {
      borderRadius: "0px",
      textAlign: "left",
      padding: "40px",
      color: "#0E47EF",
    },
    buttonWrapper: {
      //computer
      [theme.breakpoints.up("lg")]: {
        "& button": {
          marginTop: "3%",
        },
      },
      //iphone
      [theme.breakpoints.down("sm")]: {},
      display: "flex",
      justifyContent: "flex-end",
    },
    votesWrapper: {
      paddingTop: "2em",
      paddingBottom: "2em",
    },
    changeButton: {
      textAlign: "right",
      fontSize: "18px",
      color: "#999999",
      cursor: "pointer",
    },
    appbar: {
      backgroundColor: "transparent",
      backgroundImage: "linear-gradient(to right, #ECF8FF, #FFF6F8)",
      display: "block-inline",
      boxShadow: "none !important",
      zIndex: 0,
      border: "none !important",
      [theme.breakpoints.down("md")]: {
        backgroundImage: "linear-gradient(to right, #ECF8FF, #FFF6F8)",
        display: "block-inline",
        boxShadow: "none !important",
        zIndex: 0,
        border: "none !important",
      },
    },
    title: {
      flexGrows: 1,
      textAlign: "left",
      color: "#000",
      paddingTop: "5px",
    },
    headerright: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },

    headerleft: {
      fontSize: "22px",
      fontWeight: 700,
    },
    headercontainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
    },
    addressChangeText: {
      color: "#E64072",
      margin: "0px",
      textAlign: "right",
      cursor: "pointer",
    },

    voteChangeText: {
      margin: "0px",
      textAlign: "right",

      cursor: "pointer",
      "& a": {
        color: "#5CC7F2",
        textDecoration: "none",
      },
    },
    imageAlign: {
      marginTop: "-1px",
      float: "left",
    },
    messageAlign: {
      fontSize: "18px",
      float: "left",
    },
    separator: { color: "rgb(190,190,190)" },
    onlyBorder: { borderRadius: "15px 15px 0px 0px" },
    logoSize: { width: "190px" },
  })
);
export default useStyles;
