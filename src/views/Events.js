import React from "react";
import { Paper } from "@material-ui/core";
import { EventTable } from "../tables/EventTable";
import { useQuery } from "@apollo/react-hooks";
import { GET_EVENTS } from "../queries";
import { Loading } from "../components/Loading";

function Events() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <Loading message="getting latest events..." />;
  if (error) return <div>Oops</div>;
  if (data) {
    return (
      <Paper>
        Events view
        <div>
          <EventTable events={data.Events} />
        </div>
      </Paper>
    );
  }
}

export { Events };
