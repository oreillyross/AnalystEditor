import React from "react";
import { Input } from "semantic-ui-react";

const AddTagBar = () => {
  return (
 
          <Input
            icon="tags"
            iconPosition="left"
            action={{
              type: "search",
              content: "Add",
              onClick: () => {
                alert("clciked");
              }
            }}
            labelPosition="right"
            name="name"
            fluid
            placeholder="search for a tag here..."
            type="text"
            
          />
    
  );
};

export default AddTagBar;
