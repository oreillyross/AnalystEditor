import React from "react";
import { GET_EVENT_BY_ID } from "../queries";
import { TagTable } from "../tables/TagTable";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";
import { Status } from "../components/Status";
import styled from "styled-components";
import { Card } from "semantic-ui-react";
import { ControlPanel } from "../components/ControlPanel";

const EventContainer = styled.div`
  display: grid;
`;
const EventText = styled.div`
  margin: 25px;
`;

const InfoText = styled.div`
  font-size: 0.9rem;
  color: gray;
  margin: 25px;
`;

function removeTag(obj) {
  if (!obj) return [];
  // this below line might not be necessary

  let keys = Object.keys(obj);
  // eslint-disable-next-line
  keys.map(key => {
    if (obj[key].hasOwnProperty("Tag")) {
      Object.assign(obj[key], obj[key]["Tag"]);
      delete obj[key]["Tag"];
    }
  });
  return obj;
}

function Event({ id }) {
  function deleteEvent() {
    console.log("delete");
  }

  function editEvent() {
    console.log("edit");
  }

  const { data, loading } = useQuery(GET_EVENT_BY_ID, { variables: { id } });

  if (loading) return <Loading message="getting event..." />;
  if (data) {
    const event = data.Events[0];
    const tags = removeTag(event.Event_Tags);
    return (
      <EventContainer>
        <EventText> {event.text}</EventText>
        <Card.Description style={{ margin: "25px" }}>
          Tags
          {tags.length !== 0 ? (
            <TagTable tags={tags} />
          ) : (
            <InfoText>
              This event currently has no tags associated with it{" "}
            </InfoText>
          )}
        </Card.Description>

        <div style={{ textAlign: "right", padding: "25px" }}>
          {" "}
          <ControlPanel
            color="blue"
            onEdit={editEvent}
            onDelete={deleteEvent}
            show={["edit", "delete"]}
          />{" "}
        </div>
        <Status view="Event" created_at={event.created_at} />
      </EventContainer>
    );
  }
}

export { Event };
