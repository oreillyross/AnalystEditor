import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledBorder = styled.div`
  padding: 25px;
  border: 1px solid black;
`;

function LinkBar() {
  return <StyledBorder>this is where the link bar goes</StyledBorder>;
}

export { LinkBar };
