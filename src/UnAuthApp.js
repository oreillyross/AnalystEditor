import React from "react";
import LandingPage from "./components/Landing";
import SignUpPage from "./components/SignUp";
import SignInPage from "./components/SignIn";
import { Router } from "@reach/router";
import * as ROUTES from "./constants/routes";
import NotFound from "./components/NotFound";

function UnAuthApp() {
  return (
    <div>
      <Router>
        <LandingPage path={ROUTES.LANDING} />
        <SignUpPage path={ROUTES.SIGN_UP} />
        <SignInPage path={ROUTES.SIGN_IN} />
        <NotFound default />
      </Router>
    </div>
  );
}

export default UnAuthApp;
