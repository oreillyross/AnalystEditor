import React from "react";
import Loader from "react-loader-spinner";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: center;
  margin-top 25px;
`;

const StyledContent = styled.div`
  display: inline block;
`;
function Loading({ message = "Loading content" }) {
  return (
    <StyledContainer>
      <StyledContent>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />{" "}
        {message}
      </StyledContent>
    </StyledContainer>
  );
}

export { Loading };
