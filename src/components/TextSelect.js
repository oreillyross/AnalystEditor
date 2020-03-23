import React from "react";
import TextSelector from "./TextSelector";
import TextSelectModal from "./TextSelectModal";

function TextSelect({ article = {} }) {
  const [selectedText, setSelectedText] = React.useState("");

  const [modalOpen, setModalOpen] = React.useState(false);

  const [tags, setTags] = React.useState(article.initialTags || []);

  const selectText = selectedText => {
    console.log(selectedText);
    setSelectedText(selectedText);
    if (selectedText !== "") setModalOpen(true);
  };

  const cancelSelection = () => {
    setModalOpen(false);
  };

  const saveSnippet = () => {
    const { title, source, publishedDateTime, url } = article;
    console.table({
      title,
      source,
      publishedDateTime,
      url,
      selectedText,
      tags
    });
    setModalOpen(false);
  };

  const onTagDelete = name => {
    const newTags = tags.filter(tag => tag !== name);
    setTags(newTags);
  };

  const addTag = value => {
    if (!tags.includes(value) && value !== "") {
      setTags([...tags, value]);
    }
  };

  if (Object.entries(article).length === 0 && article.constructor === Object) {
    return <div>Oops, looks like you need to pass an article</div>;
  }
  return (
    <div>
      <TextSelector selectText={selectText} article={article} />
      {selectedText !== "" && (
        <TextSelectModal
          articleSelectedText={{ ...article, selectedText, tags }}
          open={modalOpen}
          cancelSelection={cancelSelection}
          saveSnippet={saveSnippet}
          onTagDelete={onTagDelete}
          addTag={addTag}
        />
      )}
    </div>
  );
}

export default TextSelect;
