import React from "react";
import Tag from "../components/Tag";
import { StyledTags } from "../styles/common";

function TagTable({ tags = [] }) {
  return (
    <StyledTags>
      {tags.map(tag => (
        <Tag key={tag.name} name={tag.name} type={tag.typeKeyword = 'person'} />
      ))}
    </StyledTags>
  );
}

export default TagTable;
