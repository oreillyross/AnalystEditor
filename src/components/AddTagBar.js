import React from "react";
import { Input, Button, Form } from "semantic-ui-react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import useFuse from "react-use-fuse";
import styled from "styled-components";

const options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

const TagBarContainer = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

function AddTagBar({ initialTags = [], addTag }) {
  const { result, search, reset } = useFuse({ data: initialTags, options });
  const [value, setValue] = React.useState("");

  const inputAndResults = value && result.length !== 0;

  return (
    <Downshift
      itemToString={tag => (tag ? tag.name : "")}
      onStateChange={changes => {
        if (changes.hasOwnProperty("selectedItem")) {
          setValue(changes.selectedItem.name);
        } else if (changes.hasOwnProperty("inputValue")) {
          setValue(changes.inputValue);
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
            isOpen: {isOpen.toString()}, inputValue: {inputValue}, value:{" "}
            {value}, highlightedIndex: {highlightedIndex}, selectedItem:{" "}
            {selectedItem ? selectedItem.name : null}, result.length:{" "}
            {result.length}
            <div>
              <TagBarContainer>
                <Input
                  {...getInputProps({
                    icon: "tags",
                    iconPosition: "left",
                    fluid: true,
                    placeholder: "search for a tag here...",
                    type: "text",
                    onKeyUp: e => search(e.target.value),

                    value
                  })}
                />{" "}
                <Button
                  onClick={() => {
                    if (value) {
                      let tagToAdd = initialTags.filter(
                        initialTag => initialTag.name == value
                      )[0];
                      if (!tagToAdd) tagToAdd = { name: value, id: "" };

                      addTag(tagToAdd);
                      setValue("");
                    }
                  }}
                >
                  Add
                </Button>
              </TagBarContainer>
              {isOpen && inputAndResults ? (
                <ul
                  {...getMenuProps({
                    style: {
                      marginLeft: "1rem",
                      marginTop: "-15px%",
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
          </div>
        );
      }}
    </Downshift>
  );
}

AddTagBar.propTypes = {
  initialTags: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, id: PropTypes.string })
  ),
  addTag: PropTypes.func
};

export { AddTagBar };
