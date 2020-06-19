import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import { Icon } from "semantic-ui-react";

import { Button } from "semantic-ui-react";
const StyledNavigation = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

function Navigation({ userId }) {
  return (
    <StyledNavigation>
      <Link to={`/projects/${userId}`}>Projects </Link>
      <div>
        <Button>Create a new project</Button>
      </div>
    </StyledNavigation>
  );
}

export default Navigation;
