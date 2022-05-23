import React from "react";
import Governance from "./pages/Governance";
// import Footer from "./components/Footer";
import "./fontFamily/SpaceGrotesk-Regular.ttf";
import "./fontFamily/SpaceGrotesk-Bold.ttf";
import "./App.css";

function App() {

  return (
    <div className="App">
      <Governance/>
      {/* <Router>
        <Switch>
          <Route exact path="/" component={Governance}></Route>
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
