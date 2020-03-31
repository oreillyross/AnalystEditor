import React from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { prettyDate } from "../utils";
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
        {view} created on: {prettyDate(created_at)} and last updated on:{" "}
        {prettyDate(updated_at)}
      </Border>
    </div>
  );
}

export default Status;
