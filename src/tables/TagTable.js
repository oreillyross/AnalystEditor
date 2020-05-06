import React from "react";
import { StyledTags } from "../styles/common";
import { Button } from "semantic-ui-react";
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
  return (
    <StyledTags>
      {tags.map(tag => (
        <React.Fragment key={tag.id}>
          <Button
            type="button"
            style={{ margin: ".3rem", height: "40px", borderRadius: "20px" }}
            basic
            color="blue"
            onClick={() => {
              navigate(`/tag/${tag.id}`);
            }}
          >
            {tag.name}
          </Button>
        </React.Fragment>
      ))}
    </StyledTags>
  );
}

export { TagTable };
