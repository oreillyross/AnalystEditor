import React from "react";
import { Paper } from "@material-ui/core";
import { Button } from "semantic-ui-react";
import SourceTable from "../tables/SourceTable";
import { StyledHeader } from "../styles/common";
import { GET_SOURCES } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";

function Sources({ navigate }) {
  const { loading, error, data } = useQuery(GET_SOURCES);

  if (loading) return <Loading message="getting sources..." />;
  if (error)
    return <div>Failed to get sources, check your internet connection...</div>;
  if (data)
    return (
      <div>
        <StyledHeader>Sources</StyledHeader>
        <Button
          style={{ margin: "1rem 2rem" }}
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
            <SourceTable sources={data.Sources} />
          </div>
        </Paper>
      </div>
    );
}

export default Sources;
