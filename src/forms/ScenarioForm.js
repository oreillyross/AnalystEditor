import React from "react";
import { useFormik, Formik, FieldArray } from "formik";
import { TextField, Button, FormLabel, Paper } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { spacing } from "@material-ui/system";
import Checkbox from "@material-ui/core/Checkbox";
import "../style.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_SCENARIOS,
  ADD_SCENARIO,
  GET_INDICATORS,
  ADD_SCENARIO_INDICATOR
} from "../queries";
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
import { latestIndicatorsOnly } from "../utils";

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
  let indicators = [{ Indicator: { id: "", name: "", strength: 2 } }];
  if (location.state.scenario) {
    scenarioName = location.state.scenario.name;
    scenarioDescription = location.state.scenario.description;
    indicators = location.state.scenario.Scenario_Indicators;
    console.log("latest indicators", indicators);
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
  const [addScenarioIndicator] = useMutation(ADD_SCENARIO_INDICATOR);

  if (error) console.log(error);
  return (
    <Formik
      initialValues={{
        scenarioName,
        scenarioDescription,
        indicators
      }}
      onSubmit={values => {
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
        }).then(result => {
          values.indicators.map(({ Indicator: indicator }) =>
            addScenarioIndicator({
              variables: {
                indicator_id: indicator.id,
                scenario_id: result.data.insert_Scenarios.returning[0].id
              }
            })
          );
        });
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
                                    <React.Fragment>
                                      {values.indicators.map(
                                        ({ Indicator: indicator }) => (
                                          <TableRow key={indicator.id}>
                                            <TableCell>
                                              {indicator.name}
                                            </TableCell>
                                          </TableRow>
                                        )
                                      )}
                                      <TableRow>
                                        <TableCell>
                                          Unlinked Indicators
                                        </TableCell>
                                        <TableCell></TableCell>
                                      </TableRow>
                                      {indicatorData &&
                                        indicatorData.Indicators.filter(
                                          ind =>
                                            !values.indicators.find(
                                              ({ Indicator: val }) =>
                                                ind.id === val.id
                                            )
                                        ).map(indicator => (
                                          <TableRow key={indicator.id}>
                                            <TableCell>
                                              {indicator.name}{" "}
                                              <button
                                                onClick={() => {
                                                  arrayHelpers.push({
                                                    Indicator: indicator
                                                  });
                                                }}
                                              >
                                                Add
                                              </button>
                                            </TableCell>
                                            <TableCell>5</TableCell>
                                          </TableRow>
                                        ))}
                                    </React.Fragment>
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
                    <Button color="primary" type="submit">
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
