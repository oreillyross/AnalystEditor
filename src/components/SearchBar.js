import React from "react";
import { OutlinedInput } from '@material-ui/core';


function GenericSearchBar({ placeholder = "Search" }) {
  
 return (
    <div>
      <OutlinedInput placeholder={placeholder} fullWidth/>
    </div>
  );
}

export default GenericSearchBar;
