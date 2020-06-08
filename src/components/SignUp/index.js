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
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, username, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => this.setState({ error }));
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeHolder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeHolder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeHolder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeHolder="Confirm Password"
        />

        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

function SignUpLink() {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}> Sign up </Link>
    </p>
  );
}

export default SignUpPage;

export { SignUpForm, SignUpLink };
