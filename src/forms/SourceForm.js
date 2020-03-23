import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import {
  TextField,
  InputLabel,
  Input,
  Button,
  FormLabel,
  Paper
} from "@material-ui/core";
import "../style.css";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";

const ADD_SOURCE = gql`
  mutation AddSource($name: String!, $description: String, $url: String) {
    insert_Sources(
      objects: { name: $name, description: $description, url: $url }
    ) {
      returning {
        id
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 400
    }
  }
}));

function showDialog() {
  alert("added record");
}

const SourceForm = () => {
  const classes = useStyles();

  const [addSource, { data, error }] = useMutation(ADD_SOURCE, {
    onCompleted: () => {
      showDialog();
    }
  });
  if (error) console.log(error);
  if (data) console.log(data);

  const formik = useFormik({
    initialValues: {
      sourceName: "",
      sourceDescription: "",
      sourceUrl: ""
    },
    onSubmit: values => {
      addSource({
        variables: {
          name: values.sourceName,
          description: values.sourceDescription,
          url: values.sourceUrl
        }
      }).then(result => console.log(result));
    }
  });
  return (
    <Paper>
      <form
        className={classes.root}
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <FormLabel className="form-label"> Source Form</FormLabel>
        <div>
          <TextField
            id="sourceName"
            className={classes.textField}
            margin="dense"
            name="sourceName"
            variant="outlined"
            required
            label="Name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.sourceName}
          />
        </div>
        <div>
          <TextField
            id="sourceDescription"
            name="sourceDescription"
            multiline
            rows={4}
            margin="dense"
            label="Description"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.sourceDescription}
          />
        </div>
        <div>
          <TextField
            id="sourceUrl"
            name="sourceUrl"
            margin="dense"
            variant="outlined"
            label="Hyperlink"
            type="url"
            onChange={formik.handleChange}
            value={formik.values.sourceUrl}
          />
        </div>
        <div style={{ paddingRight: ".8rem", textAlign: "right" }}>
          <Button color="secondary  ">Cancel</Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default SourceForm;
