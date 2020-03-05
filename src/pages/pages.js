import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./home";
import Navbar from "../components/Navbar";
import AuthIsLoaded from "../tools/authIsLoaded";
import PrivateRoute from "../tools/privateRoute";

import "../style.css";
import Login from "./login";
import Signup from "./signup";

// Setup react-redux so that connect HOC can be used
export default function Pages() {
  return (
    <BrowserRouter>
      <AuthIsLoaded>
        <Navbar />

        <Home />
        <div>
          <Switch>
            {/* <Route exact path="/"> */}
            {/* </Route> */}
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <PrivateRoute exact path="/protected">
              <div>Protected content</div>
            </PrivateRoute>
          </Switch>
        </div>
      </AuthIsLoaded>
    </BrowserRouter>
  );
}
