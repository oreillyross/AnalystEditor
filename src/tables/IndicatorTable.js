import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import { Link } from "@reach/router";

const marks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 10,
    label: "10"
  }
];

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  row: {}
});

function IndicatorTable({ indicators }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Indication</TableCell>
            <TableCell>Scenarios</TableCell>
            <TableCell>Strength</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indicators.map(indicator => {
            return (
              <TableRow key={indicator.id} className={classes.row}>
                <TableCell className={classes.row}>
                  <Link to={`/views/indicator/${indicator.id}`}>
                    {indicator.name}
                  </Link>
                </TableCell>
                <TableCell className={classes.row}>{6}</TableCell>

                <TableCell>
                  <Slider
                    defaultValue={5}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    min={1}
                    max={10}
                    marks={marks}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IndicatorTable;
