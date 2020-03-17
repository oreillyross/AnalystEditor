import React from "react";
import { StyledTags } from "../styles/common";
import { Button, Icon } from "semantic-ui-react";
import { GET_TAGS, DELETE_TAG } from "../queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
const assert = require("assert");

function TagTable({ tags = [] }) {
  const [queryDeleteTag] = useMutation(DELETE_TAG);

  function deleteTag(id, e) {
    assert(id);
    queryDeleteTag({ variables: { id } });
  }

  return (
    <StyledTags>
      {tags.map(tag => (
        <React.Fragment key={tag.id}>
          <Button
            type="button"
            style={{ margin: ".3rem", height: "40px", borderRadius: "20px" }}
            basic
            color="blue"
          >
            {tag.name}

            <Icon
              onClick={() => deleteTag(tag.id)}
              corner="top right"
              size="small"
              name="delete"
            />
          </Button>
        </React.Fragment>
      ))}
    </StyledTags>
  );
}

export default TagTable;
