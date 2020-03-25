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

const ADD_SCENARIO = gql`
  mutation AddScenario($name: String!, $description: String) {
    insert_Scenarios(objects: { name: $name, description: $description }) {
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

const ScenarioForm = () => {
  const classes = useStyles();

  const [addScenario, { data, error }] = useMutation(ADD_SCENARIO, {
    onCompleted: () => {
      showDialog();
    }
  });
  if (error) console.log(error);
  if (data) console.log(data);

  const formik = useFormik({
    initialValues: {
      scenarioName: "",
      scenarioDescription: ""
    },
    onSubmit: values => {
      addScenario({
        variables: {
          name: values.scenarioName,
          description: values.scenarioDescription
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
        <FormLabel className="form-label"> Scenario Form</FormLabel>
        <div>
          <TextField
            id="scenarioName"
            className={classes.textField}
            margin="dense"
            name="scenarioName"
            variant="outlined"
            required
            label="Name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.scenarioName}
          />
        </div>
        <div>
          <TextField
            id="scenarioDescription"
            name="scenarioDescription"
            multiline
            rows={4}
            margin="dense"
            label="Description"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.scenarioDescription}
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

export default ScenarioForm;
