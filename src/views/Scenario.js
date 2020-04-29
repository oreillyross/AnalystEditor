import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SCENARIO } from "../queries";
import { Status } from "../components/Status";
import { prettyDate } from "../utils";
import styled from "styled-components";

const Heading = styled.h3`
  font-weight: strong
  padding: 1rem;
  padding: 24px 0 24px 12px;

`;
const Content = styled.p`
  border: 1px solid thistle;
`;

function Scenario({ id }) {
  const { data, loading } = useQuery(GET_SCENARIO, { variables: { id } });
  if (loading) return null;
  if (data) {
    const { name, created_at, updated_at, description } = data.Scenarios[0];

    return (
      <div>
        <Heading>{name}</Heading>
        <Content>{description}</Content>
        <Status
          view="Scenario"
          created_at={created_at}
          updated_at={updated_at}
        />
      </div>
    );
  }
}

export default Scenario;
