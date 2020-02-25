import React from 'react'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function ArticleTable({articles}) {
  
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
            <TableRow key={row.title}>
              <TableCell>
                <a href={`/article/${row.id}`}>{row.title}</a>
              </TableCell>
              <TableCell align="left">
                {(row.Article_Source_Link) ? row.Article_Source_Link.name : ''  }
              </TableCell>
              <TableCell align="right" />
              <TableCell align="right">
                {row.ArticleIndicationCount}
              </TableCell>
              <TableCell align="right">{row.articleScenarioCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ArticleTable