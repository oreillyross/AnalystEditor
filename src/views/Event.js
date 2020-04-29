import React from "react";
import { GET_EVENT_BY_ID } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";

function Event({ id }) {
  const { data, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id } });
  if (loading) return <Loading message="getting event..." />;
  if (data) {
    console.log(data.Events[0]);
    return (
      <div>
        <div>The ID taken from url is: {id}</div>
        {Object.entries(data.Events[0]).map(keyVal => (
          <div>
            {keyVal[0]} : {keyVal[1]}{" "}
          </div>
        ))}
      </div>
    );
  }
}

export { Event };
