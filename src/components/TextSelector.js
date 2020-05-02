import React from "react";
import { TextareaAutosize, makeStyles } from "@material-ui/core";
import { navigate } from "@reach/router";
import { SelectTextModal } from "../components/SelectTextModal";

const useStyles = makeStyles({
  textarea: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    fontSize: "1rem"
  }
});

const TextSelector = ({ article, selectText }) => {
  const classes = useStyles();
  const { text } = article;
  const [open, setOpen] = React.useState(false);
  const [selectedText, setSelectedText] = React.useState("");

  function takeSelection() {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      setSelectedText(selectedText);
      setOpen(true);
    }
  }

  return (
    <div style={{ textAlign: "left" }}>
      <SelectTextModal
        open={open}
        selectedText={selectedText}
        onCancel={() => setOpen(false)}
        onCreateEvent={() =>
          navigate("/event/addevent", { state: { selectedText, article } })
        }
      />
      <div id="txtarea" onClick={() => takeSelection()}>
        {text}
      </div>
    </div>
  );
};

export default TextSelector;
