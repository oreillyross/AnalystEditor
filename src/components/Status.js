import React from "react";
import { Paper } from "@material-ui/core";

function Status({ view, created_at, updated_at }) {
  return (
    <div>
      <Paper variant="outlined">
        {view} {created_at} {updated_at}
      </Paper>
    </div>
  );
}

export default Status;
