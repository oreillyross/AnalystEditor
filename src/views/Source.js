import React from "react";
import PropTypes from "prop-types";

Source.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string
  })
};

function Source({ source }) {
  return <div>Source</div>;
}

export { Source };
