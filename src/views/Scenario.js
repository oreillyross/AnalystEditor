import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SCENARIO } from "../queries";
import Status from "../components/Status";
import { prettyDate } from "../utils";

function Scenario({ id }) {
  const { data, loading } = useQuery(GET_SCENARIO, { variables: { id } });
  if (loading) return null;
  if (data) {
    const { name, created_at, updated_at, description } = data.Scenarios[0];

    return (
      <div>
        {name}
        {description}
        <Status
          view="Scenario"
          created_at={created_at}
          updated_at={updated_at}
        />
      </div>
    );
  }
}

export default Scenario;
