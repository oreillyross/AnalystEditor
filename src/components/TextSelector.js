import React from "react";
import { navigate } from "@reach/router";
import { SelectTextModal } from "../components/SelectTextModal";

const TextSelector = ({ article, selectText }) => {
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
