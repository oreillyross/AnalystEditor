import React from "react";
import Chip from './Chip'


function Tag({ name, type }) {
  if (!name) return null;
  return (
    
      <Chip
        name={name}
        onDelete={() => alert("delete")}
        
      />
    
  );
}

export default Tag;
