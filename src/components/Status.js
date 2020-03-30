import React from "react";
import { Paper } from "@material-ui/core";
import styled from "styled-components";

const Border = styled.div`
  padding: 1.2rem;
  border: 1px solid grey;
`;

function Status({ view, created_at, updated_at }) {
  return (
    <div>
      <Border variant="outlined">
        {view} {created_at} {updated_at}
      </Border>
    </div>
  );
}

export default Status;
