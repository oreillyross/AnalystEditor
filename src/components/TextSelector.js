import React from "react";
import { TextareaAutosize, makeStyles } from "@material-ui/core";
import { navigate } from "@reach/router";

const useStyles = makeStyles({
  textarea: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    fontSize: "1rem"
  }
});

function getSelectedText() {
  const txtarea = document.getElementById("txtarea");
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  return txtarea.value.substring(start, finish);
}

const TextSelector = ({ article, selectText }) => {
  const classes = useStyles();
  const { text } = article;

  function takeSelection() {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      // show the modal dialog asking if to capture this event
      navigate("/event/addevent", { state: { selectedText } });
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <div id="txtarea" onClick={() => takeSelection()}>
        {text}
      </div>
    </div>
  );
};

export default TextSelector;
