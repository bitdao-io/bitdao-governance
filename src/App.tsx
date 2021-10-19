import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Governance from "./pages/Governance";
// import Footer from "./components/Footer";
import "./fontFamily/SpaceGrotesk-Regular.ttf";
import "./fontFamily/SpaceGrotesk-Bold.ttf";
import "./App.css";
declare let window: any;


function App() {
  
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Governance}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
