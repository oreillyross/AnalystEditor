import React from 'react'
import styled from "styled-components";
import { Button } from "@material-ui/core";


const StyledArticleAuthor = styled.div`
  font-style: italic;
  font-size: 1rem;
`;

function ArticleTextSelect({article, resetArticle}) {
  return (
    <div>
    <div>{article.title}</div>
<StyledArticleAuthor>by {article.author}</StyledArticleAuthor>
    <blockquote>
{article.text}
    </blockquote>
    <Button onClick={resetArticle}>Return to articles</Button>
    </div>
  )
}

export default ArticleTextSelect