import React from "react";
import { GET_TAG } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Paper } from "@material-ui/core";
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
        <Paper>{data.Tags[0].name}</Paper>
      </div>
    );
  }
}

export default Tag;
