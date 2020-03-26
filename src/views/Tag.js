import React from "react";
import { GET_TAG } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Paper, Card, CardHeader, CardContent } from "@material-ui/core";
function Tag({ id }) {
  const { data, loading } = useQuery(GET_TAG, {
    variables: {
      id
    }
  });
  if (loading) return null;
  if (data) {
    return (
      <div>
        <Paper>
          <Card variant="outlined">
            <CardHeader title={data.Tags[0].name} />

            <CardContent>
              Is currently linked to{" "}
              <a href={`/events/bytag/${data.Tags[0].id}`}>
                {" "}
                {data.Tags[0].Event_Tags_aggregate.aggregate.count}{" "}
              </a>
              Events.{" "}
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default Tag;
