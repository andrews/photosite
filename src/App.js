import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Home";
import Admin, { NotFound } from "./admin/Admin";
import SignInPage from "./admin/SignIn";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  function RenderAdmin() {
    if (loginStatus) {
      return <Admin setLoginStatus={setLoginStatus} />
    } else {
      return <SignInPage setLoginStatus={setLoginStatus} />
    }
  }

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/admin">
            <RenderAdmin />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route> 
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


export default App