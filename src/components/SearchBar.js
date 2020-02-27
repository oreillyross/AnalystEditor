import React from "react";
import { OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddButton from "./AddButton";

const useStyles = makeStyles({
  input: {
    color: "red",
    padding: "0 0 0 1.2rem",
    borderRadius: "0 25px 25px 0"
  }
});

function GenericSearchBar({
  showAddButton,
  placeholder = "Search",
  value,
  onChange
}) {
  const classes = useStyles();
  return (
    <div>
      {showAddButton ? (
        <OutlinedInput
          className={classes.input}
          placeholder={placeholder}
          fullWidth
          autoFocus
          value={value}
          onChange={onChange}
          endAdornment={<AddButton />}
        />
      ) : (
        <OutlinedInput
          className={classes.input}
          placeholder={placeholder}
          fullWidth
          autoFocus
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default GenericSearchBar;
