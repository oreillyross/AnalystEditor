import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Moment from "react-moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function ArticleTable({ articles, viewArticle }) {
  console.log(articles);
  console.log(
    articles[0].Article_Events[0].Article.Article_Events_aggregate.aggregate
      .count
  );
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Article</TableCell>
            <TableCell align="left">Source</TableCell>
            <TableCell align="right">Events</TableCell>
            <TableCell align="right">Indications</TableCell>
            <TableCell align="right">Scenarios</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map(row => (
            <TableRow key={row.title}>
              <TableCell>
                <Moment>{row.published}</Moment>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => viewArticle(row)}
                  component="a"
                  fullWidth
                >
                  {row.title}
                </Button>
              </TableCell>
              <TableCell align="left">
                {row.Article_Source_Link ? row.Article_Source_Link.name : ""}
              </TableCell>
              <TableCell align="right">
                {row.Article_Events.length !== 0
                  ? row.Article_Events[0].Article.Article_Events_aggregate
                      .aggregate.count
                  : null}
              </TableCell>
              <TableCell align="right">{row.ArticleIndicationCount}</TableCell>
              <TableCell align="right">{row.articleScenarioCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArticleTable;
