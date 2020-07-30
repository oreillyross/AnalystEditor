import React from "react";
import styled from "styled-components";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { navigate } from "@reach/router";

const StyledBar = styled.div`
  background-color: WhiteSmoke;
  color: grey;
  text-align: right;
  padding: 12px 0;
`;
const Spacer = styled.span`
  padding: 0 12px 0 12px;
`;
const StyledA = styled.a`
  :hover {
    color: blue;
    cursor: pointer;
  }
`;

function UserBar({ authUser, firebase }) {
  return (
    <StyledBar>
      Docs <Spacer /> Get Support <Spacer />
      {authUser ? (
        <StyledA
          onClick={() => {
            firebase.doSignOut();
            navigate(ROUTES.LANDING);
          }}
        >
          {" "}
          Sign out{" "}
        </StyledA>
      ) : (
        <>Sign In</>
      )}
      <Spacer />{" "}
    </StyledBar>
  );
}

export default withFirebase(UserBar);
