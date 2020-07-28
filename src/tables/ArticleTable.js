import React from "react";
import { Button } from "reactstrap";
import Moment from "react-moment";
import HorizonTable from "../components/HorizonTable";
import { format } from "date-fns";
import { Link } from "@reach/router";
import * as ROUTES from "../constants/routes";

function getData(articles) {
  const rows = articles.map(article => ({
    title: article.title,
    published: article.published,
    status: article.status,
    url: article.url
  }));
  return rows;
}

function getColumns() {
  const columns = [
    { Header: "Status", accessor: "status" },
    {
      Header: "Published",
      accessor: "published",
      Cell: props => format(new Date(props.value), "PPP")
    },
    {
      Header: "Title",
      accessor: "title",
      Cell: props => {
        console.log(props);
        return <Link to={ROUTES.LANDING}>{props.value}</Link>;
      }
    }
  ];
  return columns;
}

function ArticleTable({ articles, viewArticle, navigate }) {
  const data = getData(articles);
  const columns = getColumns();
  return (
    <div>
      <HorizonTable columns={columns} data={data} />
    </div>
  );
}

export default ArticleTable;
