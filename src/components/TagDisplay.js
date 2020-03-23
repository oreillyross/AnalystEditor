import React from "react";
import styled from "styled-components";
import Tag from "./Tag";

const StyledContainer = styled.div`
  text-align: left;
  padding: 1rem;
`;

export default function TagDisplay({ tags = {}, deleteTag }) {
  return (
    <StyledContainer>
      {!tags.length ? (
        <div style={{ padding: "1rem" }} data-testid="notags">
          no tags yet
        </div>
      ) : (
        tags.map((tag, index) => {
          return <Tag key={index} name={tag} deleteTag={deleteTag(index)} />;
        })
      )}
    </StyledContainer>
  );
}
