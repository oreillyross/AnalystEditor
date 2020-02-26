import React from "react";
import { Input } from "@material-ui/core";


function SearchBar({ placeholder = "Search" }) {
  
 return (
    <div>
      <Input placeholder={placeholder} />
    </div>
  );
}

export default SearchBar;
