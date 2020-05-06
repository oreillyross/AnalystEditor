import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_EVENTS_BY_ARTICLE } from "../queries";
import { Loading } from "../components/Loading";
import { EventTable } from "../tables/EventTable";

function EventsByArticle({ id }) {
  const { loading, error, data } = useQuery(GET_EVENTS_BY_ARTICLE, {
    variables: { articleId: id }
  });

  if (loading) return <Loading message="getting events linked by article..." />;
  if (error)
    return (
      <div>
        Oops an error occured trying to retrieve the events linked by article
        with id of {id}
      </div>
    );
  if (data) {
    return <EventTable events={data.Events} />;
  }
}

export { EventsByArticle };
