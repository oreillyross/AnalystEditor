import React from "react";
import PropTypes from "prop-types";
import { GET_INDICATOR } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Loading } from "../components/Loading";
import styled from "styled-components";
import { ControlPanel } from "../components/ControlPanel";
import { Status } from "../components/Status";
import { LinkBar } from "../components/LinkBar";

const StyledContent = styled.div`
  margin: 25px;
  padding: 1rem;
  border: 1px dashed grey;
  border-radius: 15px;
`;

const StyledDescription = styled.div`
  margin: 25px;
  padding: 1rem;
`;
Indicator.propTypes = {
  id: PropTypes.string
};

function Indicator({ id }) {
  const editIndicator = () => null;
  const deleteIndicator = () => null;

  const { loading, data } = useQuery(GET_INDICATOR, {
    variables: { id }
  });
  if (loading) return <Loading message="getting indicator..." />;
  if (data) {
    const { name, description, created_at } = data.Indicators[0];
    return (
      <div>
        <StyledContent>{name}</StyledContent>
        <StyledDescription>{description}</StyledDescription>

        <div style={{ textAlign: "right", padding: "25px" }}>
          {" "}
          <ControlPanel
            color="blue"
            onEdit={editIndicator}
            onDelete={deleteIndicator}
            show={["edit", "delete"]}
          />{" "}
        </div>
        <LinkBar />
        <Status view="Indicator" created_at={created_at} />
      </div>
    );
  }
}

export { Indicator };
