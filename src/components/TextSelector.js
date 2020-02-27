import React from "react";
import { TextArea } from "semantic-ui-react";
import TagDisplay from "./TagDisplay";

function getSelectedText() {
  const txtarea = document.getElementById("txtarea");
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  return txtarea.value.substring(start, finish);
}

const TextSelector = ({ article, selectText }) => {
  const { title, source, publishedDateTime, url, text, initialTags } = article;
  return (
    <div style={{ padding: "1.2rem" }}>
      <a href={url} rel="noreferrer noopener" target="_blank">
        <h1>{title}</h1>
      </a>

      <h2>
        by the {source} <span> published on: {publishedDateTime}</span>{" "}
      </h2>

      <div style={{ textAlign: "center" }}>
        <TextArea
          id="txtarea"
          onMouseUp={() => selectText(getSelectedText())}
          rows={20}
          style={{ width: "90%", padding: "1.2rem" }}
          value={text}
        />
        <TagDisplay tags={initialTags} />
      </div>
    </div>
  );
};

export default TextSelector;
