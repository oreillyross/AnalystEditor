import React from "react"
import { StyledTags } from "../styles/common";
import { Button, Icon } from "semantic-ui-react";
import { GET_TAGS, DELETE_TAG } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";

const assert = require("assert");

function TagTable({ tags = [] }) {
  const [queryDeleteTag] = useMutation(DELETE_TAG);

  function deleteTag(id, e) {
    assert(id);

    queryDeleteTag({
      variables: { id },
      update(cache, { data }) {
        console.log(data);
        const getExistingTags = cache.readQuery({ query: GET_TAGS });
        const existingTags = getExistingTags ? getExistingTags.Tags : [];
        const deletedTag = data.delete_Tags
          ? data.delete_Tags.returning[0]
          : {};
        cache.writeQuery({
          query: GET_TAGS,
          data: { Tags: existingTags.filter(tag => tag.id !== deletedTag.id) }
        });
      }
    });
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
            onClick={() => navigate(`/tag/${tag.id}`)}
          >
            {tag.name}

            <Icon
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this tag"))
                  deleteTag(tag.id);
              }}
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
