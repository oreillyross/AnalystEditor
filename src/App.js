import React from "react";
import Firebase, { withFirebase } from "./components/Firebase";
import AuthApp from "./AuthApp";
import UnAuthApp from "./UnAuthApp";
import SignOutButton from "./components/SignOut";
import UserBar from "./components/UserBar";
import "./App.css";

function App({ firebase }) {
  const [authUser, setAuthUser] = React.useState(null);
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  }, [authUser]);

  return (
    <>
      <UserBar authUser={authUser} />
      <AuthApp authUser={authUser} />
    </>
  );
}

export default withFirebase(App);
