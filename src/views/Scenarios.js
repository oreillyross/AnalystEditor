import React from "react";
import { GET_SCENARIOS } from "../queries";
import ScenarioTable from "../tables/ScenarioTable";
import { useQuery } from "@apollo/react-hooks";
import { StyledHeader } from "../styles/common";

function Scenarios() {
  const { data, loading } = useQuery(GET_SCENARIOS);
  if (data) console.log(data);
  if (loading) return <div> Loading... </div>;
  if (data)
    return (
      <div>
        <StyledHeader>Scenarios</StyledHeader>
        <ScenarioTable scenarios={data.Scenarios} />
      </div>
    );
}

export default Scenarios;
