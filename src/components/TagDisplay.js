import React from "react";
import styled from "styled-components";

const StyledTag = styled.span`
  padding-top: 10px
  margin: .3rem;
  
`;
const StyledTagContainer = styled.div``;

const StyledContainer = styled.div`
  text-align: left;
  padding-left: 1.3rem;
`;

export default function TagDisplay({ tags = {} }) {
  return (
    <StyledContainer>
      <h3>Tags</h3>
      <StyledTagContainer>
        {!tags.length ? (
          <div data-testid="notags">no tags associated with this article</div>
        ) : (
          tags.map(tag => {
            return <StyledTag key={tag}>{tag};&nbsp;&nbsp; </StyledTag>;
          })
        )}
      </StyledTagContainer>
    </StyledContainer>
  );
}
