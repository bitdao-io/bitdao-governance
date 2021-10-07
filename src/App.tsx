import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Governance from "./pages/Governance";
// import Footer from "./components/Footer";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./fontFamily/SpaceGrotesk-Regular.ttf";
import "./fontFamily/SpaceGrotesk-Bold.ttf";
import "./App.css";
declare let window: any;
const THEME = createMuiTheme({
  typography: {
    fontFamily: `SpaceGroteskBold !important`,
  },
});

function App() {
  const [
    provider,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    contracts,
    accounts,
    networkId,
  ] = useWeb3Modal();
  
  return (
    <div className="App">
      <MuiThemeProvider theme={THEME}>
        <Router>
          <Switch>
            <Route exact path="/" component={Governance}></Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
