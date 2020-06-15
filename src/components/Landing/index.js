import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const StyledMain = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const StrapLine = styled.div`
  grid-column: 2 / 10;
`;
const StyledButton = styled(Button)`
  grid-column: 11 / 13;
`;

function LandingPage() {
  return (
    <StyledMain>
      <StrapLine>
        {" "}
        Horizon is the next generation tool to demistify media reporting and
        allow one to take a step back from the headline grabbing sensational
        news and to lean into a more balanced view of where the world might be
        heading.
      </StrapLine>
      <StyledButton>Sign Up</StyledButton>
    </StyledMain>
  );
}

export default LandingPage;
