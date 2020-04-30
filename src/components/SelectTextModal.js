import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

function SelectTextModal({ open }) {
  return (
    <Modal open={open} basic size="small">
      <Header icon="archive" content="You Selected the following text" />
      <Modal.Content>
        <p>Some selected text</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted>
          <Icon name="remove" /> Cancel
        </Button>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Create an Event
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export { SelectTextModal };
