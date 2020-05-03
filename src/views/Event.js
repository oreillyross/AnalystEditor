import React from "react";
import { GET_EVENT_BY_ID } from "../queries";
import { TagTable } from "../tables/TagTable";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";
import { Status } from "../components/Status";
import styled from "styled-components";
import { Card } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import { ControlPanel } from "../components/ControlPanel";

const EventText = styled.div`
  margin: 25px;
`;

function removeTag(obj) {
  if (!obj) return [];
  // this below line might not be necessary

  let keys = Object.keys(obj);
  keys.map(key => {
    if (obj[key].hasOwnProperty("Tag")) {
      Object.assign(obj[key], obj[key]["Tag"]);
      delete obj[key]["Tag"];
    }
  });
  return obj;
}

function Event({ id }) {
  const { data, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id } });
  if (loading) return <Loading message="getting event..." />;
  if (data) {
    const event = data.Events[0];
    console.log(event);
    const tags = removeTag(event.Event_Tags);

    return (
      <div>
        <ControlPanel color="blue" show={["edit", "delete"]} />
        <EventText> {event.text}</EventText>
        <Card.Description style={{ margin: "25px" }}>
          Tags
          <TagTable tags={tags} />
        </Card.Description>

        <Status view="Event" created_at={event.created_at} />
      </div>
    );
  }
}

export { Event };
