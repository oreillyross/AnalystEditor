import React from "react";
import { GET_EVENT_BY_ID } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";

function Event({ id }) {
  const { data, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id } });
  if (loading) return <Loading message="getting event..." />;
  if (data) {
    return <div>{id}</div>;
  }
}

export { Event };
