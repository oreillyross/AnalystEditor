import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ArticleTable from "../tables/ArticleTable";
import ArticleTextSelect from "../components/ArticleTextSelect";



const GET_ARTICLES = gql`
  query getArticles {
    Articles {
      id
      title
      text
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
  const [article, setArticle] = React.useState({});
  const viewArticle = row => {
    setArticle(row);
  };
  if (loading) return null;
  if (
    !(Object.entries(article).length === 0 && article.constructor === Object)
  ) {
    return <ArticleTextSelect resetArticle={() => setArticle({})} article={article} />;
  }

  if (error) return <div>Oops</div>;

  if (data) {
    const articles = data.Articles;
    return <ArticleTable viewArticle={viewArticle} articles={articles} />;
  }
}

export default Articles;
