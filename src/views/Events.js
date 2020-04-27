import React from "react";
import { Paper } from "@material-ui/core";
import EventTable from "../tables/EventTable";

function Events() {
  return (
    <Paper>
      Events view
      <div>
        <EventTable />
      </div>
    </Paper>
  );
}

export { Events };
