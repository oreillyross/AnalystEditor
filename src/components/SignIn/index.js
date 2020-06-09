import React from "react";
import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { navigate } from "@reach/router";

function SignInPage() {
  return (
    <div>
      <h1>Sign in</h1>
      <SignInForm />
      <SignUpLink />
    </div>
  );
}

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUSer => {
        this.setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch(error => this.setState({ error }));
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === "" || password === "";
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="your email"
          value={email}
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="your password"
          value={password}
          onChange={this.onChange}
        />
        <button disabled={isInvalid}>Sign In</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withFirebase(SignInFormBase);

export default SignInPage;

export { SignInForm };
