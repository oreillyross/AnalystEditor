import React from "react";
import { Link, navigate } from "@reach/router";
import * as ROUTES from "../../constants/routes";
import { Formik } from "formik";
import { withFirebase } from "../Firebase";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../../queries";

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

function SignUpFormBase({ firebase }) {
  const [state, setState] = React.useState(INITIAL_STATE);
  const [addUser, { data }] = useMutation(ADD_USER);

  const { username, email, passwordOne, passwordTwo, error } = state;
  const onSubmit = event => {
    event.preventDefault();

    const { email, username, passwordOne } = state;
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // then create a mapped user in the hasura db
        addUser({
          variables: { email: email, name: username, uid: authUser.user.uid }
        });
        console.log(authUser.user.uid);
        setState(INITIAL_STATE);
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        console.log(error);
        setState({ error });
      });
  };

  const onChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === "" ||
    email === "" ||
    username === "";

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="email"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />

      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
}

function SignUpLink() {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}> Sign up </Link>
    </p>
  );
}

const SignUpForm = withFirebase(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
