import React from "react";
import { format } from "date-fns";
import { Link } from "@reach/router";
import styled from "styled-components";
import PropTypes from "prop-types";
import HorizonTable from "../components/HorizonTable";

const StyledLink = styled(Link)`
  color: black;
`;

EventTable.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      created_at: PropTypes.date
    })
  )
};

function getData(events) {
  const rows = events.map(event => ({
    text: event.text
  }));
  return rows;
}
function getColumns() {
  const columns = [{ Header: "Text", accessor: "text" }];
  return columns;
}
function EventTable({ events }) {
  const data = getData(events);
  const columns = getColumns();

  return (
    <div>
      <HorizonTable data={data} columns={columns} />
    </div>
  );
}

export { EventTable };
