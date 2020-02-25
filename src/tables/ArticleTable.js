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
import Article from "../views/Article";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const GET_ARTICLES = gql`
  query getArticles {
    Articles {
      id
      title
      author
      url
      Article_Source_Link {
        name
      }
    }
  }
`;

export function ArticleTable() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return null;
  if (error) return <div>Oops</div>;

  if (data) {
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
            {data.Articles.map(row => (
              <TableRow key={row.title}>
                <TableCell>
                  <a href={`/article/${row.id}`}>{row.title}</a>
                </TableCell>
                <TableCell align="left">
                  {row.Article_Source_Link.name}
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
}
