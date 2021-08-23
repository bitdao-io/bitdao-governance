import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      fontFamily:"ABeeZeeRegular !important",
      backgroundColor:
        "#ffffff",
      color: "#2D82B7",
      padding:"5px"
      
      
    },
    footerlogo: {
      height: "80px",
      marginLeft: "-15px",
    },
    footercontainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center !important',
      alignItems: 'center',
      boxSizing: "border-box",
      paddingRight:"50px",
      
      
    },
    table:{
      display:"table",
    },
    social: {
      float:"left",
      color:"#919191",
      paddingRight:"50px",
      display: 'inline',
      fontFamily:"ABeeZeeRegular !important",
      "& a": {
        color:"#919191",
        textDecoration:"none"
      },
    },
    linkcontainer: {
      fontFamily:"ABeeZeeRegular !important",
      display: "flex",
      flexDirection: "column",
      color:"#919191"
    },
    imageAlign:{
     
      marginTop:"-25px",
      
    },
    

  })
);

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

function Footer() {
  const classes = useStyles();
  return (
    <Grid spacing={5} className={classes.footer} >
      <div className={classes.footercontainer}>
        
        <div className={classes.table}>
          <ul className={classes.social}>
            <li className={classes.social}><a target="_blank"href={`${process.env.REACT_APP_BITDAO_GOVERNANCE}`}>Governance Forum</a></li>
            <li className={classes.social}><a target="_blank"href={`${process.env.REACT_APP_BITDAO_DISCORD}`}>Discord</a></li>
            <li className={classes.social}><a target="_blank"href={`${process.env.REACT_APP_BITDAO_SNAPSHOT}`}>Snapshot Voting</a></li>
            <li className={classes.social}><a target="_blank"href={`${process.env.REACT_APP_BITDAO_DOCS}`}>Docs</a></li>
            <li className={classes.social} style={{color:"#0E47EF", marginTop:"10px",float:"left"}}>
            <img src={process.env.REACT_APP_CLOUDFRONT + "langlogo.png"} className={classes.imageAlign}/>
            </li>
          </ul>
          
        </div>
       
        
        </div>
     
    </Grid>
  );
}

export default Footer;
