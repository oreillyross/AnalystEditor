import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import { Button } from "semantic-ui-react";

const StyledNavigation = styled.div`
  border-bottom: 1px solid lightgray;
`;

function Navigation() {
  return (
    <StyledNavigation>
      <Link to={ROUTES.HOME}>
        <Button>Home</Button>
      </Link>
      <Link to={ROUTES.SIGN_IN}>
        <Button>Sign in</Button>
      </Link>
      <Link to="/admin">
        <Button>Admin</Button>
      </Link>
      <Link to="/articles">
        <Button>Articles</Button>
      </Link>
      <Link to={ROUTES.LANDING}>
        <Button>Landing Page</Button>
      </Link>
      <Link to="/events">
        <Button>Events</Button>
      </Link>
      <Link to="/tags">
        <Button>Tags</Button>
      </Link>
      <Link to="/keywords">
        <Button>Keywords</Button>
      </Link>
      <Link to="/sources">
        <Button>Sources</Button>
      </Link>
      <Link to="/search">
        <Button>Search</Button>
      </Link>
      <Link to="/scenarios">
        <Button>Scenarios</Button>
      </Link>
      <Link to="/indicators">
        <Button>Indicators</Button>
      </Link>
    </StyledNavigation>
  );
}

export default Navigation;
