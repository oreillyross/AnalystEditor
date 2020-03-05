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

const GET_SOURCES = gql`
  query getSources {
    Sources {
      id
      name
      url
    }
  }
`;

function IndicatorTable() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_SOURCES);

  if (loading) return null;
  if (error) return <div>Oops</div>;

  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Source Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Sources.map(row => (
              <TableRow key={row.name}>
                <TableCell>
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.name}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default IndicatorTable;
