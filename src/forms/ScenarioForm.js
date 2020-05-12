import React from "react";
import { useFormik, Formik, FieldArray } from "formik";
import { TextField, Button, FormLabel, Paper } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { spacing } from "@material-ui/system";
import Checkbox from "@material-ui/core/Checkbox";
import "../style.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_SCENARIOS, ADD_SCENARIO, GET_INDICATORS } from "../queries";
import styled from "styled-components";
import { LinkedIndicators } from "../views/LinkedIndicators";
import Slider from "@material-ui/core/Slider";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "@reach/router";

const StyledIndicatorLink = styled.div`
  padding: 15px;
`;

const StyledForm = styled.div`
  display: grid;
  padding: 24px;
`;

function showDialog() {
  alert("added record");
}

const marks = [
  {
    value: 0,
    label: "0"
  },
  {
    value: 5,
    label: "5"
  },
  {
    value: 10,
    label: "10"
  }
];

const ScenarioForm = ({ navigate, location }) => {
  let scenarioName = "";
  let scenarioDescription = "";
  let indicators = [];
  if (location.state.scenario) {
    scenarioName = location.state.scenario.name;
    scenarioDescription = location.state.scenario.description;
    indicators = location.state.scenario.Scenario_Indicators;
    console.log("what is shape", indicators);
  }
  const { loading, data: indicatorData, error: indicatorError } = useQuery(
    GET_INDICATORS
  );

  if (indicatorError) console.log(indicatorError);

  const [addScenario, { data, error }] = useMutation(ADD_SCENARIO, {
    onCompleted: () => {
      showDialog();
      navigate("/scenarios");
    }
  });

  if (error) console.log(error);
  return (
    <Formik
      initialValues={{
        scenarioName,
        scenarioDescription,
        indicators
      }}
      onSubmit={values => {
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
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => {
        return (
          <div>
            <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    value={values.scenarioName}
                  />
                  <div style={{ padding: "14px" }} />
                  <TextField
                    id="scenarioDescription"
                    name="scenarioDescription"
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    value={values.scenarioDescription}
                  />
                  <StyledIndicatorLink>
                    Linked Indicators
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Indication</TableCell>
                            <TableCell>Strength</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {indicatorData && (
                            <React.Fragment>
                              <FieldArray name="indicators">
                                {arrayHelpers => {
                                  return (
                                    <div>
                                      <div>
                                        Linked Indicators mapped go here{" "}
                                        {values.indicators.map(
                                          ({ Indicator: indicator }) => (
                                            <div>{indicator.name}</div>
                                          )
                                        )}
                                      </div>{" "}
                                      <div>Unlinked indicators go here</div>
                                      <div>
                                        {indicatorData &&
                                          indicatorData.Indicators.filter(
                                            ind =>
                                              !values.indicators.find(
                                                ({ Indicator: val }) =>
                                                  ind.id === val.id
                                              )
                                          ).map(indicator => (
                                            <div>{indicator.name}</div>
                                          ))}
                                      </div>
                                    </div>
                                  );
                                }}
                              </FieldArray>
                            </React.Fragment>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </StyledIndicatorLink>

                  <div style={{ paddingRight: ".8rem", textAlign: "right" }}>
                    <Button>Cancel</Button>
                    <Button
                      color="primary"
                      type="submit"
                      enabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </div>
                </StyledForm>
              </Paper>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default ScenarioForm;
