import React from "react";
import { Link } from "@reach/router";
import * as ROUTES from "../../constants/routes";
import { Formik } from "formik";

function SignUpPage() {
  return (
    <div>
      <h1> Signup </h1>
      <SignUpForm />
    </div>
  );
}

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmit = event => {};

  onChange = event => {};

  render() {
    return <form onSubmit={this.onSubmit}></form>;
  }
}

function SignUpLink() {
  return (
    <p>
      Don't have an account? <Link to={ROUTES_SIGN_UP}> Sign up </Link>
    </p>
  );
}

export default SignUpPage;

export { SignUpForm, SignUpLink };
