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
import { format } from "date-fns";
import { GET_EVENTS_BY_TAG } from "../queries";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function EventsByTag({ id }) {
  const classes = useStyles();
  console.log(id);
  const { loading, error, data } = useQuery(GET_EVENTS_BY_TAG, {
    variables: { tagid: id }
  });

  if (loading) return null;
  if (error) return <div>Oops</div>;
  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Event</TableCell>
              <TableCell>Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Events.map(row => (
              <TableRow key={row.id}>
                <TableCell>{format(new Date(row.created_at), "yyy")}</TableCell>
                <TableCell>{row.text}</TableCell>
                <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default EventsByTag;