import React from "react";
import { Input } from "semantic-ui-react";
import Downshift from "downshift";

const AddTagBar = ({ initialTags }) => {
  console.log(initialTags);

  return (
    <Downshift>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem
      }) => {
        return (
          <div>
          <Input
            icon="tags"
            iconPosition="left"
            fluid
            placeholder="search for a tag here..."
            type="text"
          />
          </div>
        );

      }}
    </Downshift>
  );
};

export default AddTagBar;
