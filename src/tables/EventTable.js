import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const GET_EVENTS = gql`
  query getEvents {
  Events {
    id
    text
    Event_Source_Link {
      name
    }
  }
}
`;

function EventTable() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return null;
  if (error) return <div>Oops</div>;
  if (data) console.log(data)
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event</TableCell>
              <TableCell>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Events.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  {row.text}
                </TableCell>
                <TableCell>
                  {row.Event_Source_Link.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default EventTable;