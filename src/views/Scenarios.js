import React from "react";
import { GET_SCENARIOS } from "../queries";
import ScenarioTable from "../tables/ScenarioTable";
import { useQuery } from "@apollo/react-hooks";
import { StyledHeader } from "../styles/common";
import { Button } from "semantic-ui-react";

function Scenarios({ navigate }) {
  const { data, loading } = useQuery(GET_SCENARIOS);
  if (data) console.log(data);
  if (loading) return <div> Loading... </div>;
  if (data)
    return (
      <div>
        <StyledHeader>Scenarios</StyledHeader>
        <Button
          style={{ margin: "0 2rem" }}
          onClick={() => {
            navigate("/forms/newscenario");
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
