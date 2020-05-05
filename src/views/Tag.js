import React from "react";
import { GET_TAG } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Paper, Card, CardHeader, CardContent } from "@material-ui/core";
import { Icon } from "semantic-ui-react";
import { Loading } from "../components/Loading";

function Tag({ id }) {
  const { data, loading } = useQuery(GET_TAG, {
    variables: {
      id
    }
  });
  if (loading) return <Loading message="Loading event..." />;
  if (data) {
    return (
      <div>
        <Paper>
          <div>
            <CardHeader title={data.Tags[0].name} />

            <CardContent>
              Is currently linked to{" "}
              <a href={`/events/bytag/${data.Tags[0].id}`}>
                {" "}
                {data.Tags[0].Event_Tags_aggregate.aggregate.count}{" "}
              </a>
              Events.{" "}
            </CardContent>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Tag;
