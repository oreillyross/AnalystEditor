import React from "react";
import { Input,Button } from "semantic-ui-react";
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

  return (
    <Downshift
    
      itemToString={item => (item ? item.name : "")}
      initialHighlightedIndex={1}
    >
      {({
        getMenuProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        clearSelection
      }) => {
        return (
          <div>
            <Input
              {...getInputProps({
                icon: "tags",
                iconPosition: "left",
                fluid: true,
                placeholder: "search for a tag here...",
                type: "text",
                onKeyPress: e => {
                  search(inputValue);
                  if (e.key === "Enter") {
                    reset();
                    clearSelection();
                  }
                }
              })}
            /><Button type='button' onClick={() => {
              console.log(selectedItem)
              addTag(selectedItem)}
              }>Add Tag</Button>
            {isOpen ? (
              <div>
                <ul
                  {...getMenuProps({
                    style: {
                      marginLeft: "1rem",
                      padding: "1rem",
                      position: "absolute",
                      zIndex: 10,
                      border: "1px solid green",
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
                              highlightedIndex === index
                                ? "lightgray"
                                : "#f5f6f7",
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
              </div>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
};

export default AddTagBar;
