import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function SelectTextModal({ open, selectedText }) {
  const [modalOpen, setmodalOpen] = React.useState(open);

  return (
    <Modal open={open} basic size="small">
      <Header icon="archive" content="You Selected the following text" />
      <Modal.Content>
        <p>{selectedText}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setmodalOpen(false)} basic color="red" inverted>
          <Icon name="cancel" /> Cancel
        </Button>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Create an Event
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export { SelectTextModal };
