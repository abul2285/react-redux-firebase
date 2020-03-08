import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./home";
import Navbar from "../components/Navbar";
import AuthIsLoaded from "../tools/authIsLoaded";
import PrivateRoute from "../tools/privateRoute";

import "../style.css";
import Login from "./login";
import Signup from "./signup";
import { CardActions, CardHeader, Avatar } from "@material-ui/core";

// Setup react-redux so that connect HOC can be used
export default function Pages() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Navbar />

        <div>
          <Switch>
            {/* <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <PrivateRoute exact path="/protected">
              <div>Protected content</div>
            </PrivateRoute> */}
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}
