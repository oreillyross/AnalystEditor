import React from "react";
import styled from "styled-components";
import Firebase, { withFirebase } from "./components/Firebase";
import AuthApp from "./AuthApp";
import UnAuthApp from "./UnAuthApp";
import SignOutButton from "./components/SignOut";

const StyledDashboard = styled.div`
  display: grid;
`;

const StyledHeader = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  padding: 0.5rem;
`;

function App({ firebase }) {
  const [authUser, setAuthUser] = React.useState(null);

  React.useEffect(() => {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  }, []);

  return (
    <StyledDashboard>
      <StyledHeader>
        Horizon Analyst Dashboard
        <span style={{ float: "right" }}>
          {authUser ? <SignOutButton /> : null}
        </span>
      </StyledHeader>

      {authUser ? <AuthApp /> : <UnAuthApp />}
    </StyledDashboard>
  );
}

export default withFirebase(App);
