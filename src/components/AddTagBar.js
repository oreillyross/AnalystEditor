import React from "react";
import { Input, Button } from "semantic-ui-react";
import Downshift from "downshift";
import useFuse from "react-use-fuse";

const options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

const AddTagBar = ({ initialTags = [], addTag }) => {
  const { result, search, reset } = useFuse({ data: initialTags, options });
  const [value, setValue] = React.useState("");

  const inputAndResults = value && result.length !== 0;

  return (
    <Downshift
      itemToString={value => (value ? value.name : "")}
      onStateChange={changes => {
        if (changes.hasOwnProperty("selectedItem")) {
          setValue(changes.selectedItem.name);
        } else if (changes.hasOwnProperty("inputValue")) {
          setValue(changes.inputValue);
        }
        if (changes.type === Downshift.stateChangeTypes.keyDownEnter) {
          setValue(changes.inputValue);
          reset();
        }
      }}
    >
      {({
        getMenuProps,
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        clearSelection
      }) => {
        return (
          <div>
            isOpen: {isOpen.toString()}, inputValue: {inputValue},
            highlightedIndex: {highlightedIndex}, selectedItem:{" "}
            {selectedItem ? selectedItem.name : null}, result.length:{" "}
            {result.length}
            <Input
              {...getInputProps({
                icon: "tags",
                iconPosition: "left",
                fluid: true,
                placeholder: "search for a tag here...",
                type: "text",

                onKeyUp: e => {
                  if (e.keyCode === 13 && inputValue) {
                    if (selectedItem) {
                      console.log(
                        "selectedItem: ",
                        selectedItem.name,
                        "inputValue: ",
                        inputValue
                      );
                    }
                  } else {
                    search(e.target.value);
                  }
                },
                value
              })}
            />{" "}
            <span style={{ float: "right" }}>button</span>
            {isOpen && inputAndResults ? (
              <ul
                {...getMenuProps({
                  style: {
                    marginLeft: "1rem",
                    padding: "1rem",
                    position: "absolute",
                    zIndex: 10,
                    borderRadius: "0 25px 30px 0",
                    backgroundColor: "#f5f6f7",
                    width: "50vw"
                  }
                })}
              >
                {result.map((tag, index) => {
                  return (
                    <li
                      {...getItemProps({
                        key: tag.id,
                        item: tag,
                        index,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "red" : "green",
                          listStyleType: "none",
                          position: "relative"
                        }
                      })}
                    >
                      {tag.name}
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};

export default AddTagBar;
