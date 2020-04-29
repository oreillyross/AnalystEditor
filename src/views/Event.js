import React from "react";
import { GET_EVENT_BY_ID } from "../queries";
import { TagTable } from "../tables/TagTable";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";
import { Status } from "../components/Status";
import styled from "styled-components";
import { Card } from "semantic-ui-react";

const EventText = styled.div`
  margin: 25px;
`;

function Event({ id }) {
  const { data, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id } });
  if (loading) return <Loading message="getting event..." />;
  if (data) {
    const event = data.Events[0];
    return (
      <Card style={{ margin: "25px" }} fluid raised>
        <EventText> {event.text}</EventText>
        <Card.Description style={{ margin: "25px" }}>
          Tags
          <TagTable tags={["one", "two", "three"]} />
        </Card.Description>

        <Status view="Event" created_at={event.created_at} />
      </Card>
    );
  }
}

export { Event };
