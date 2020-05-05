import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";
import { Link } from "@reach/router";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLink = styled(Link)`
  color: black;
`;

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

EventTable.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  )
};

function EventTable({ events }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(row => (
            <TableRow key={row.id}>
              <TableCell>
                {format(new Date(row.created_at), "d MMM yyyy, H:mm ")}
              </TableCell>
              <TableCell>
                {" "}
                <StyledLink to={`/views/event/${row.id}`}>
                  {row.text}
                </StyledLink>
              </TableCell>
              <TableCell>{row.Event_Source_Link.name}</TableCell>
              <TableCell>{row.Event_Tags_aggregate.aggregate.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export { EventTable };
