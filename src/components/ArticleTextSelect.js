import React from 'react'
import styled from "styled-components";
import { Button } from "@material-ui/core";
import TextSelectModal from './TextSelectModal'
import TextSelector from './TextSelector'


const StyledArticleAuthor = styled.div`
  font-style: italic;
  font-size: 1rem;
`;

function ArticleTextSelect({article, resetArticle}) {
  console.log(article)
  return (
    <div>
    <div>{article.title}</div>
<StyledArticleAuthor>by {article.author}</StyledArticleAuthor>
    <TextSelector article={article}/>
    <Button onClick={resetArticle}>Return to articles</Button>
    </div>
  )
}

export default ArticleTextSelect