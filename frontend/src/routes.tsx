import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./screens/dashboard";
import Login from "./screens/login";

import { selectAuth } from "./store/auth";

const Routes = () => {
  const { role } = useSelector(selectAuth);

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          {!role ? <Redirect to="/login" /> : <Dashboard />}
        </Route>
        {/* <Route path="/reviews">
            <Review />
          </Route> */}
      </Switch>
    </Router>
  );
};

export default Routes;
