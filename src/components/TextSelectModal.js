import React from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import Tags from "./Tags";

const TextSelectModal = ({
  open,
  articleSelectedText,
  cancelSelection,
  saveSnippet,
  onTagDelete,
  addTag
}) => {
  const {
    title,
    source,
    publishedDateTime,
    url,
    selectedText,
    tags
  } = articleSelectedText;

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => {
        cancelSelection();
      }}
    >
      <Modal.Header>Selected information / event</Modal.Header>

      <Modal.Description>
        <Header style={{ padding: "1.2rem" }}>
          <a href={url} rel="noreferrer noopener" target="_blank">
            {title}
          </a>
        </Header>
        <p style={{ padding: "1.2rem" }}>
          by {source} <span>published on {publishedDateTime}</span>
        </p>
      </Modal.Description>
      <Modal.Content>
        <div style={{ padding: "1.2rem" }}>{selectedText}</div>
      </Modal.Content>
      <Modal.Actions>
        <Tags initialTags={tags} onDelete={onTagDelete} addTag={addTag} />
        <Button
          onClick={() => {
            saveSnippet();
          }}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TextSelectModal;
