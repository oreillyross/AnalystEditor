import React from "react";
import PropTypes from "prop-types";
import { GET_INDICATOR } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";
import styled from "styled-components";
import { ControlPanel } from "../components/ControlPanel";
import { Status } from "../components/Status";
const StyledContent = styled.div`
  margin: 25px;
  padding: 1rem;
`;
Indicator.propTypes = {
  id: PropTypes.string
};

function Indicator({ id }) {
  const editEvent = () => null;
  const deleteEvent = () => null;

  const { loading, data, error } = useQuery(GET_INDICATOR, {
    variables: { id }
  });
  if (loading) return <Loading message="getting indicator..." />;
  if (data) {
    const { name, created_at } = data.Indicators[0];
    return (
      <div>
        <StyledContent>{name}</StyledContent>
        <div style={{ textAlign: "right", padding: "25px" }}>
          {" "}
          <ControlPanel
            color="blue"
            onEdit={editEvent}
            onDelete={deleteEvent}
            show={["edit", "delete"]}
          />{" "}
        </div>
        <Status view="Indicator" created_at={created_at} />
      </div>
    );
  }
}

export { Indicator };
