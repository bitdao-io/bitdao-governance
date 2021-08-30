import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Governance from "./pages/Governance";
// import Footer from "./components/Footer";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./fontFamily/SpaceGrotesk-Regular.ttf";
import "./fontFamily/SpaceGrotesk-Bold.ttf";

import NotifyPopup from "./pages/Governance/NotifyPopup";
import "./App.css";
declare let window: any;
const THEME = createMuiTheme({
  typography: {
    fontFamily: `SpaceGroteskBold !important`,
  },
});

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal, contracts, accounts,networkId] =
  useWeb3Modal();
  const [winSize, setWinSize] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    if(width<768){
      console.log(width)
      setOpen(true);
      setWinSize(width);
    }
    else{
      setOpen(false);
      setWinSize(width);
    }
  }, [winSize]);
  return (
    <div className="App">
      <MuiThemeProvider theme={THEME}>
        
        {winSize < 768 ? (
          <NotifyPopup open={open} handleClose={handleClose} text={`Please visit this page on desktop`} />
        ) : (
          <>
           
            <Router>
              <Switch>
                <Route exact path="/governance" component={Governance}></Route>
              </Switch>
            </Router>

            {/* <Footer /> */}
          </>
        )}
      </MuiThemeProvider>
    </div>
  );
}

export default App;
