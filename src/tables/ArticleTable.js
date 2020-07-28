import React from "react";
import { Button } from "reactstrap";
import Moment from "react-moment";
import HorizonTable from "../components/HorizonTable";

function getData(articles) {
  const rows = articles.map(article => ({
    title: article.title,
    published: article.published,
    status: article.status
  }));
  return rows;
}

function getColumns() {
  const columns = [
    { Header: "Status", accessor: "status" },
    { Header: "Published", accessor: "published" },
    {
      Header: "Title",
      accessor: "title"
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
