import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const articles = [
  {
    articleName: 'China Death Toll Rises and Hong Kong Imposes Quarantines',
    articleHref: 'https://www.nytimes.com/2020/02/05/world/asia/coronavirus-china.html',
    articleTagCount: 3,
    articleSource: 'The New York Times',
  }
]



export function ArticleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Article</TableCell>
            <TableCell align="left">Source</TableCell>
            <TableCell align="right">Tags</TableCell>
            <TableCell align="right">Indications</TableCell>
            <TableCell align="right">Scenarios</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map(row => (
            <TableRow key={row.articleName}>
              <TableCell component="th" scope="row">
                <a href={row.articleHref} target='_blank' rel='noopener noreferrer'>{row.articleName}</a>
              </TableCell>
              <TableCell align="left">{row.articleSource}</TableCell>
              <TableCell align="right">{row.articleTagCount}</TableCell>
              <TableCell align="right">{row.ArticleIndicationCount}</TableCell>
              <TableCell align="right">{row.articleScenarioCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
