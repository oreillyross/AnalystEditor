import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SCENARIO } from "../queries";
import Status from "../components/Status";

function Scenario({ id }) {
  console.log(id);
  const { data, loading } = useQuery(GET_SCENARIO, { variables: { id } });
  if (loading) return null;
  if (data) {
    console.log(data.Scenarios[0]);
    return (
      <div>
        {data.Scenarios[0].name}

        <Status view="Scenario" />
      </div>
    );
  }
}

export default Scenario;
