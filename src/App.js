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
  const [currentUser, setUser] = useState('')
  const [loginStatus, setLoginStatus] = useState(0);

  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/admin">
            {loginStatus === 0 && <SignInPage />}
            {loginStatus === 1 && <Admin />}
          </Route>
          <Route exact path="/">
            <Home currentUser={currentUser} />
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