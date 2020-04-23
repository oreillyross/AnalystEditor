import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { GET_SCENARIO } from "../queries";

function ScenarioTable({ scenarios }) {
  console.log(scenarios);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Scenario</TableCell>
              <TableCell>Indications</TableCell>
              <TableCell>Events</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scenarios.map(row => (
              <TableRow key={row.id}>
                <TableCell>
                  <a href={`/views/scenario/${row.id}`}>{row.name}i</a>{" "}
                </TableCell>

                <TableCell>
                  <a href={`/indicators/byscenario/${row.id}`}>
                    {row.Scenario_Indicators_aggregate.aggregate.count}
                  </a>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScenarioTable;
