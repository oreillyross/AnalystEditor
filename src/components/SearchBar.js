import React from "react";
import { OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    color: "red",
    padding: '0 0 0 1.2rem',
    borderRadius: '0 25px 25px 0'
  }
});

function GenericSearchBar({ placeholder = "Search" }) {
  const classes = useStyles();
  return (
    <div>
      <OutlinedInput
        className={classes.input}
        placeholder={placeholder}
        fullWidth
        autoFocus
      />
    </div>
  );
}

export default GenericSearchBar;
