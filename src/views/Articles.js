import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ArticleTable from '../tables/ArticleTable'

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

function Articles() {

  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Oops</div>;
  if (data) {
    const articles = data.Articles
    return <ArticleTable articles={articles}/>
  }
}

export default Articles
