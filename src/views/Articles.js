import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ArticleTable from "../tables/ArticleTable";
import ArticleTextSelect from "../components/ArticleTextSelect";
import { Button } from "semantic-ui-react";
import { StyledHeader } from "../styles/common";
import { GET_ARTICLES } from '../queries'



function Articles({ navigate }) {
  const { loading, error, data } = useQuery(GET_ARTICLES);
  const [article, setArticle] = React.useState({});
  const viewArticle = row => {
    setArticle(row);
  };
  if (loading) return null;
  if (
    !(Object.entries(article).length === 0 && article.constructor === Object)
  ) {
    return (
      <ArticleTextSelect
        resetArticle={() => setArticle({})}
        article={article}
      />
    );
  }

  if (error) return <div>Oops</div>;

  if (data) {
    const articles = data.Articles;
    return (
      <div>
        <StyledHeader>Articles</StyledHeader>
        <div>
          <Button
            style={{ margin: "0 2rem" }}
            onClick={() => {
              navigate("/forms/newarticle");
            }}
            
            basic
            color='blue'
          >
            Add an Article
          </Button>
        </div>
        <ArticleTable viewArticle={viewArticle} articles={articles} />
      </div>
    );
  }
}

export default Articles;
