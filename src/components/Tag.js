import React from "react";
import { Button, Icon } from "semantic-ui-react";

function Tag({ name, deleteTag, viewKeyword }) {
  if (!name) return null;
  return (
    <Button
      type="button"
      style={{ margin: ".3rem", height: "40px", borderRadius: "20px" }}
      basic
      color="blue"
      onClick={viewKeyword}
    >
      {name}

      <Icon onClick={deleteTag} corner="top right" size="small" name="delete" />
    </Button>
  );
}

export default Tag;
