import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_SCENARIO } from "../queries";
import { Status } from "../components/Status";
import styled from "styled-components";
import { ControlPanel } from "../components/ControlPanel";
import { Loading } from "../components/Loading";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

const Heading = styled.h3`
  font-weight: strong
  padding: 1rem;
  padding: 24px 0 24px 12px
`;

const Content = styled.p`
  border: 1px solid thistle;
`;

Scenario.propTypes = {
  id: PropTypes.string
};

function Scenario({ id, navigate }) {
  const editScenario = () =>
    navigate(`/forms/scenario`, { state: { scenario: data.Scenarios[0] } });

  const deleteScenario = () => null;
  const { data, loading } = useQuery(GET_SCENARIO, { variables: { id } });
  if (loading) return <Loading message="getting scenario..." />;
  if (data) {
    const {
      name,
      created_at,
      updated_at,
      description,
      Scenario_Indicators: indicators
    } = data.Scenarios[0];
    return (
      <div>
        <Heading>{name}</Heading>
        <Content>{description}</Content>
        <div>Linked Indicators</div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Indicator name</Table.HeaderCell>
              <Table.HeaderCell>Indicator strength</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {indicators.map(({ Indicator: indicator, strength }, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell key={indicator.id}>{indicator.name}</Table.Cell>

                  <Table.Cell>{strength}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <div style={{ textAlign: "right", padding: "25px" }}>
          <ControlPanel
            color="blue"
            onEdit={editScenario}
            onDelete={deleteScenario}
            show={["edit", "delete"]}
          />{" "}
        </div>
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
