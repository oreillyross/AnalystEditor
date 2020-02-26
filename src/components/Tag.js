import React from "react";
import { Chip } from "@material-ui/core";
import LocationCityIcon from '@material-ui/icons/LocationCity';

function Tag({ name }) {
  if (!name) return null;

  return (
    <div>
      <Chip
        icon={<LocationCityIcon/>}
        label={name}
        onDelete={() => alert("delete")}
        variant="outlined"
        color="primary"
      />
    </div>
  );
}

export default Tag;
