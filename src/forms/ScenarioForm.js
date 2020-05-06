import React from "react";
import { useFormik } from "formik";
import { TextField, Button, FormLabel, Paper } from "@material-ui/core";
import "../style.css";
import { useMutation } from "@apollo/react-hooks";
import { GET_SCENARIOS, ADD_SCENARIO } from "../queries";

function showDialog() {
  alert("added record");
}

const ScenarioForm = ({ navigate }) => {
  const [addScenario, { data, error }] = useMutation(ADD_SCENARIO, {
    onCompleted: () => {
      showDialog();
      navigate("/scenarios");
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
        },
        update(cache, { data }) {
          const getExistingScenarios = cache.readQuery({
            query: GET_SCENARIOS
          });
          const existingScenarios = getExistingScenarios
            ? getExistingScenarios
            : [];
          const newScenario = data.insert_Scenarios
            ? data.insert_Scenarios.returning[0]
            : {};
          cache.writeQuery({
            query: GET_SCENARIOS,
            data: { Scenarios: [newScenario, ...existingScenarios] }
          });
        }
      }).then(result => console.log(result));
    }
  });
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <Paper style={{ backgroundColor: "white", margin: "12px" }}>
        <div>
          <FormLabel className="form-label"> Scenario Form</FormLabel>
        </div>

        <TextField
          id="scenarioName"
          name="scenarioName"
          style={{ margin: "24px" }}
          variant="outlined"
          required
          label="Name"
          type="text"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.scenarioName}
        />
        <TextField
          id="scenarioDescription"
          name="scenarioDescription"
          multiline
          rows={4}
          label="Description"
          variant="outlined"
          onChange={formik.handleChange}
          fullWidth
          style={{ margin: "24px" }}
          value={formik.values.scenarioDescription}
        />
        <div style={{ paddingRight: ".8rem", textAlign: "right" }}>
          <Button color="secondary  ">Cancel</Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Paper>
    </form>
  );
};

export default ScenarioForm;
