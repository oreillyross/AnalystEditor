import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_TAG } from "../queries";
import { Loading } from "../components/Loading";
import { EventTable } from "../tables/EventTable";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function EventsByTag({ id }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_EVENTS_BY_TAG, {
    variables: { tagid: id }
  });

  if (loading) return <Loading message="getting linked events..." />;
  if (error) return <div>Oops</div>;
  if (data) {
    console.log(data.Events);
    return <EventTable events={data.Events} />;
  }
}

export default EventsByTag;
