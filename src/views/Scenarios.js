import React from "react";
import { GET_SCENARIOS } from "../queries";
import ScenarioTable from "../tables/ScenarioTable";
import { useQuery } from "@apollo/react-hooks";
import { StyledHeader } from "../styles/common";
import { Button } from "semantic-ui-react";
import { Loading } from "../components/Loading";

function Scenarios({ navigate }) {
  const { data, loading } = useQuery(GET_SCENARIOS);
  if (loading) return <Loading message="getting scenarios..." />;
  if (data)
    return (
      <div>
        <StyledHeader>Scenarios</StyledHeader>
        <Button
          style={{ margin: "0 2rem" }}
          onClick={() => {
            navigate("/forms/scenario");
          }}
          basic
          color="blue"
        >
          Add a Scenario
        </Button>
        <ScenarioTable scenarios={data.Scenarios} />
      </div>
    );
}

export default Scenarios;
