import React from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { prettyDate, prettyTime } from "../utils";

const Border = styled.div`
  padding: 1.2rem;
  color: grey;
  font-size: 0.9rem;
  border: 1px solid grey;
`;

function Status({ view, created_at, updated_at }) {
  return (
    <div>
      <Border variant="outlined">
        {view}
        {created_at && (
          <span>
            {" "}
            created on: {prettyDate(created_at)} at {prettyTime(created_at)}
          </span>
        )}

        {updated_at && (
          <span>
            {" "}
            and last updated on: {prettyDate(updated_at)}
            at {prettyTime(updated_at)}
          </span>
        )}
      </Border>
    </div>
  );
}

export { Status };
