import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import { Icon } from "semantic-ui-react";

const StyledNavigation = styled.div`
  border-bottom: 1px solid lightgray;
  text-align: center;
  padding: 12px;
`;

function Navigation() {
  return (
    <StyledNavigation>
      <Link to="/project/:id">
        Project <Icon name="settings" />
      </Link>
    </StyledNavigation>
  );
}

export default Navigation;
