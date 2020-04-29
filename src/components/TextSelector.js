import React from "react";
import { TextareaAutosize, makeStyles } from "@material-ui/core";

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

  return (
    <div style={{ textAlign: "left" }}>
      <div
        id="txtarea"
        onClick={() => console.log(window.getSelection().toString())}
      >
        {text}
      </div>
    </div>
  );
};

export default TextSelector;
