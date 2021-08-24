import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/admin">
            <Admin />
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

function Home() {
  return <h2>Home</h2>;
}

function HomeLink(text) {
  return (
    <Link to="/">{text}</Link>
  )
}

function Admin() {
  return (
    <div>
      {HomeLink("View Home")}
      <h2>Admin Page</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 PAGE NOT FOUND</h1>
      <h3>Return to {HomeLink("home")}</h3>
    </div>
    
  )
}

export default App