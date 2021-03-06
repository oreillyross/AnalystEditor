import React from "react";
import { GET_INDICATORS, GET_INDICATIONS_BY_SCENARIO } from "../queries";
import IndicatorTable from "../tables/IndicatorTable";
import { useQuery } from "@apollo/react-hooks";
import { StyledHeader } from "../styles/common";
import { Button } from "semantic-ui-react";
import { Loading } from "../components/Loading";

function Indicators({ navigate, view, id }) {
  let query = GET_INDICATORS;
  if (view === "byscenario") {
    query = GET_INDICATIONS_BY_SCENARIO;
  }
  const { data, loading } = useQuery(query, { variables: { id } });
  if (loading) return <Loading message="getting indicators..." />;
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

export default Indicators;
