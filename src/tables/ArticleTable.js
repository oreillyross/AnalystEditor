import React from "react";
import { Button } from "reactstrap";
import Moment from "react-moment";
import HorizonTable from "../components/HorizonTable";

function ArticleTable({ articles, viewArticle, navigate }) {
  return (
    <div>
      <HorizonTable />
    </div>
  );
}

export default ArticleTable;
