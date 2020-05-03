import React from "react";
import { StyledTags } from "../styles/common";
import { Button, Icon } from "semantic-ui-react";
import { GET_TAGS, DELETE_TAG } from "../queries";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

TagTable.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

function TagTable({ tags = [] }) {
  const [queryDeleteTag] = useMutation(DELETE_TAG);
  const [deleteFlag, setDeleteFlag] = React.useState(false);
  console.log(tags);
  function deleteTag(id, e) {
    queryDeleteTag({
      variables: { id },
      update(cache, { data }) {
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
          >
            {tag.name}

            <Icon
              onClick={e => {
                if (
                  window.confirm("Are you sure you want to delete this tag")
                ) {
                  deleteTag(tag.id);
                  setDeleteFlag(true);
                }
              }}
              corner="top right"
              size="small"
              name="delete"
            />
            <Icon
              corner="top right"
              size="small"
              name="edit"
              onClick={() => {
                navigate(`/tag/${tag.id}`);
              }}
            />
          </Button>
        </React.Fragment>
      ))}
    </StyledTags>
  );
}

export { TagTable };
