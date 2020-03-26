import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import TextSelector from "./TextSelector";
import { useMutation } from "@apollo/react-hooks";
import EventForm from "../forms/EventForm";
import gql from "graphql-tag";

const ADD_EVENT = gql`
  mutation addEvent($sourceID: uuid, $text: String) {
    __typename
    insert_Events(objects: { source_id: $sourceID, text: $text }) {
      affected_rows
    }
  }
`;

function showDialog() {
  alert("record added");
}

const StyledArticleAuthor = styled.div`
  font-style: italic;
  font-size: 1rem;
`;

function ArticleTextSelect({ article, resetArticle }) {
  const [isTextSelected, setisTextSelected] = React.useState(false);
  const [localSelectedText, setlocalSelectedText] = React.useState("");
  const [addEvent] = useMutation(ADD_EVENT, {
    onCompleted: () => {
      showDialog();
    }
  });

  const selectText = selectedText => {
    if (selectedText) {
      setisTextSelected(true);
      setlocalSelectedText(selectedText);
    } else {
      setisTextSelected(false);
    }
  };

  const saveSnippet = () => {
    console.log(article.Article_Source_Link);
    addEvent({
      variables: {
        sourceID: article.Article_Source_Link.id,
        text: localSelectedText
      }
    });
    setisTextSelected(false);
  };

  return (
    <div>
      {isTextSelected ? (
        <EventForm
          article={article}
          articleSelectedText={localSelectedText}
          cancelSelection={() => setisTextSelected(false)}
          saveSnippet={saveSnippet}
        />
      ) : (
        <React.Fragment>
          <div>{article.title}</div>
          <StyledArticleAuthor>by {article.author}</StyledArticleAuthor>
          <TextSelector selectText={selectText} article={article} />
          <Button onClick={resetArticle}>Return to articles</Button>
        </React.Fragment>
      )}
    </div>
  );
}

export default ArticleTextSelect;
