import React from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

const StyledMain = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const StyledButton = styled(Button)`
  valign: center;
  width: 80px;
  padding: 15px;
`;

function LandingPage() {
  return (
    <StyledMain>
      <div>1</div>
      <div>
        {" "}
        <StyledButton>Sign Up</StyledButton>{" "}
      </div>
      <div>3</div>
      <div>4</div>
    </StyledMain>
  );
}

export default LandingPage;
