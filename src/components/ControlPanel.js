import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

ControlPanel.propTypes = {
  color: PropTypes.oneOf(["blue", "black"]),
  show: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func
};

function ControlPanel({
  onDelete,
  color = "black",
  show = ["edit", "delete", "close"]
}) {
  return (
    <div>
      {show.includes("edit") && <Icon color={color} name="edit" />}
      {show.includes("delete") && (
        <Icon onClick={onDelete} color={color} name="trash" />
      )}
      {show.includes("close") && <Icon color={color} name="remove" />}
    </div>
  );
}

export { ControlPanel };
