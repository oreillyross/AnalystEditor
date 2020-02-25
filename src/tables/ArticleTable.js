import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Articles from '../views/Articles'

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

  const { loading, error, data } = useQuery(GET_ARTICLES);

  if (loading) return null;
  if (error) return <div>Oops</div>;

  if (data) {
    return <Articles articles={data.Articles}/>
  }
}
