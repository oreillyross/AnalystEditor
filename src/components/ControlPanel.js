import React from "react";
import PropTypes from "prop-types";
import { Icon, Button } from "semantic-ui-react";

ControlPanel.propTypes = {
  color: PropTypes.oneOf(["blue", "black"]),
  show: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onClose: PropTypes.func
};

function ControlPanel({
  onDelete,
  onEdit,
  onClose,
  color = "black",
  show = ["edit", "delete", "close"]
}) {
  return (
    <div>
      {show.includes("edit") && (
        <Button basic circular color={color} onClick={onEdit}>
          <Icon color={color} name="edit" />
        </Button>
      )}

      {show.includes("delete") && (
        <Button basic circular color={color} onClick={onDelete}>
          <Icon color={color} name="trash" />
        </Button>
      )}
      {show.includes("close") && (
        <Button basic circular color={color} onClick={onClose}>
          <Icon color={color} name="remove" />
        </Button>
      )}
    </div>
  );
}

export { ControlPanel };
