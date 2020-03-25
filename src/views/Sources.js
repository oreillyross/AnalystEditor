import React from "react";
import { Paper } from "@material-ui/core";
import { Button } from "semantic-ui-react";
import SourceTable from "../tables/SourceTable";
import { StyledHeader } from "../styles/common";

function Sources({ navigate }) {
  return (
    <div>
      <StyledHeader>Sources</StyledHeader>
      <Button
        style={{ margin: "0 2rem" }}
        onClick={() => {
          navigate("/forms/newsource");
        }}
        basic
        color="blue"
      >
        Add a Source
      </Button>
      <Paper>
        <div>
          <SourceTable />
        </div>
      </Paper>
    </div>
  );
}

export default Sources;
