import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import TextSelectModal from "./TextSelectModal";
import TextSelector from "./TextSelector";

const StyledArticleAuthor = styled.div`
  font-style: italic;
  font-size: 1rem;
`;

function ArticleTextSelect({ article, resetArticle }) {
  const [isTextSelected, setisTextSelected] = React.useState(false);
  const [localSelectedText, setlocalSelectedText] = React.useState("");

  const selectText = selectedText => {
    if (selectedText) {
      setisTextSelected(true);
      setlocalSelectedText(selectedText);
    } else {
      setisTextSelected(false);
    }
  };
  return (
    <div>
      <TextSelectModal
        open={isTextSelected}
        article={article}
        articleSelectedText={localSelectedText}
        cancelSelection={() => setisTextSelected(false)}
      />
      <div>{article.title}</div>
      <StyledArticleAuthor>by {article.author}</StyledArticleAuthor>
      <TextSelector selectText={selectText} article={article} />
      <Button onClick={resetArticle}>Return to articles</Button>
    </div>
  );
}

export default ArticleTextSelect;
