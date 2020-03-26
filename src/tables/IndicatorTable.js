import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Select } from "semantic-ui-react";
import Slider from "@material-ui/core/Slider";
import { Divider } from "semantic-ui-react";

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

const indicators = [
  { value: 1, text: "1" },
  { value: 2, text: "2" },
  { value: 3, text: "3" },
  { value: 4, text: "4" },
  { value: 5, text: "5" },
  { value: 6, text: "6" },
  { value: 7, text: "7" }
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
            <TableCell>Strength</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {indicators.map(indicator => {
            return (
              <TableRow className={classes.row}>
                <TableCell className={classes.row}>
                  1. This is an indicator example, Google takes over the world,
                  mwwwahhh
                </TableCell>
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
