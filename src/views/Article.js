import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_ARTICLE = gql`
  query getArticle($id: uuid) {
    Articles(where: { id: { _eq: $id } }) {
      title
      text
    }
  }
`;

function Article(props) {
  console.log(props);
  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: { id: props.id }
  });
  if (loading) return <div> getting record...</div>;
  if (error) return <div> ooopsie </div>;
  if (data) console.log(data);
  return (
    <div>
      <div>{data.Articles[0].text}</div>
    </div>
  );
}

export default Article;
