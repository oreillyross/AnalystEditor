import React from "react";
import { GET_INDICATIONS_BY_SCENARIO } from "../queries";
import IndicatorTable from "../tables/IndicatorTable";
import { useQuery } from "@apollo/react-hooks";
import { StyledHeader } from "../styles/common";
import { Button } from "semantic-ui-react";
import { Loading } from "../components/Loading";

function IndicatorsByScenarioId({ navigate, id }) {
  console.log(id);

  const { data, loading } = useQuery(GET_INDICATIONS_BY_SCENARIO, {
    variables: { id }
  });
  if (data) console.log(data);
  if (loading) return <Loading message="getting indicators by scenario..." />;
  if (data)
    return (
      <div>
        <StyledHeader>Indicators</StyledHeader>
        <Button
          style={{ margin: "0 2rem" }}
          onClick={() => {
            navigate("/forms/newindicator");
          }}
          basic
          color="blue"
        >
          Add a Indicator
        </Button>
        <IndicatorTable indicators={data.Indicators} />
      </div>
    );
}

export { IndicatorsByScenarioId };
