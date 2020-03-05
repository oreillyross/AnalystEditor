import React from "react";
import styled from "styled-components";
import Tag from "./Tag";

const StyledContainer = styled.div`
  text-align: left;
  padding: 1rem;
`;

export default function TagDisplay({ tags = {} }) {
  return (
    <StyledContainer>
      {!tags.length ? (
        <div style={{ padding: "1rem" }} data-testid="notags">
          no tags yet
        </div>
      ) : (
        tags.map(tag => {
          return <Tag key={tag} name={tag} />;
        })
      )}
    </StyledContainer>
  );
}
