import React from "react";
import { useFormik, Formik, FieldArray } from "formik";
import { TextField, Button, FormLabel, Paper } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "../style.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_SCENARIOS, ADD_SCENARIO, GET_INDICATORS } from "../queries";
import styled from "styled-components";
import { LinkedIndicators } from "../views/LinkedIndicators";

const StyledIndicatorLink = styled.div`
  padding: 15px;
`;

const StyledForm = styled.div`
  padding: 24px;
`;

function showDialog() {
  alert("added record");
}

const ScenarioForm = ({ navigate }) => {
  const { loading, data: indicatorData } = useQuery(GET_INDICATORS);
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
      scenarioDescription: "",
      indicatorIds: [""]
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      /*  addScenario({
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
      }).then(result => console.log(result)); */
    }
  });
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <Paper style={{ backgroundColor: "white", padding: "12px" }}>
        <div>
          <FormLabel className="form-label"> Scenario Form</FormLabel>
        </div>
        <StyledForm>
          <TextField
            id="scenarioName"
            name="scenarioName"
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
            value={formik.values.scenarioDescription}
          />
          <StyledIndicatorLink>
            Linked Indicators
            {indicatorData ? (
              <FieldArray
                name="indicatorIds"
                render={arrayHelpers => (
                  <div>
                    {" "}
                    {indicatorData.Indicators.map(indicator => (
                      <div key={indicator.id}>An Indicator</div>
                    ))}
                  </div>
                )}
              />
            ) : (
              <div> Could not load indicators...</div>
            )}
          </StyledIndicatorLink>

          <div style={{ paddingRight: ".8rem", textAlign: "right" }}>
            <Button>Cancel</Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </StyledForm>
      </Paper>
    </form>
  );
};

export default ScenarioForm;
