import React from "react";
import { OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    color: "red",
    padding: "0 0 0 1.2rem",
    borderRadius: "0 25px 25px 0"
  }
});

function SearchBar({ showAddButton, placeholder = "Search", value, onChange }) {
  const classes = useStyles();

  return (
    <OutlinedInput
      className={classes.input}
      placeholder={placeholder}
      fullWidth
      autoFocus
      value={value}
      onChange={onChange}
    />
  );
}

export { SearchBar };
