import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ArticleTable from "../tables/ArticleTable";
import { Button } from '@material-ui/core'
import styled from 'styled-components'

const StyledArticleAuthor = styled.div`
  font-style: italic;
  font-size: 1rem
  
  
`

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
  
  const viewArticle = (row) => {
    setArticle(row)
  }
  
  if (!(Object.entries(article).length === 0 && article.constructor === Object)) {
    console.log(article)
    return (
    <div>
    <div>{article.title}</div>
<StyledArticleAuthor>by {article.author}</StyledArticleAuthor>
    <blockquote>
{article.text}
    </blockquote>
    <Button onClick={() => setArticle({})}>Return to articles</Button>
    </div>
    )
  }
  
    if (loading) return <div>Loading...</div>;
  
    if (error) return <div>Oops</div>;
  
    if (data) {
    const articles = data.Articles;
    console.log(data.Articles);
    return <ArticleTable viewArticle={viewArticle} articles={articles} />;
  }
}

export default Articles;
