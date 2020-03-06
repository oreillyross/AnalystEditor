import React from "react";
import Chip from './Chip'


function Tag({ name, deleteTag }) {
  if (!name) return null;
  return (
    
      <Chip
        name={name}
        deleteTag={deleteTag}
        
      />
    
  );
}

export default Tag;
