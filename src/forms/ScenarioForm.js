import React from "react";
import { Formik, FieldArray, Form } from "formik";
import { TextField, Button, Paper } from "@material-ui/core";
import "../style.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_SCENARIO, GET_INDICATORS } from "../queries";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledIndicatorLink = styled.div`
  padding: 15px;
`;

const StyledForm = styled.div`
  display: grid;
  padding: 24px;
`;

const ScenarioForm = ({ navigate, location }) => {
  let scenarioName = "";
  let scenarioDescription = "";
  let prevIndicators = [];

  if (location.state.scenario) {
    scenarioName = location.state.scenario.name;
    scenarioDescription = location.state.scenario.description;
    prevIndicators = location.state.scenario.Scenario_Indicators.map(prev => {
      return { ...prev["Indicator"], strength: prev["strength"] };
    });
  }

  const [indicators, setIndicators] = React.useState([]);

  const { data } = useQuery(GET_INDICATORS, {
    onCompleted: data => {
      const indWithStSr = data.Indicators.map(ind => ({
        ...ind,
        strength: 5,
        status: "toLink"
      }));
      const mergedWithPrev = indWithStSr.map(curr => {
        const prevInd = prevIndicators.find(prev => prev.id === curr.id);
        return prevInd ? { ...prevInd, status: "linkedToDb" } : curr;
      });
      setIndicators(mergedWithPrev);
    }
  });

  const [addScenario] = useMutation(ADD_SCENARIO, {
    onCompleted: () => {
      navigate("/scenarios");
    }
  });

  const initialValues = {
    name: scenarioName,
    description: scenarioDescription,
    indicators: prevIndicators
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        console.log(values);
        /*addScenario({
          variables: {
            name: values.name,
            description: values.description
          }
        }).then(result => {
          console.log("this is the scenario that was added:", result);
	});*/
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
            <Form>
              <Paper style={{ backgroundColor: "white", padding: "12px" }}>
                <StyledForm>
                  <TextField
                    id="name"
                    name="name"
                    variant="outlined"
                    required
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={handleChange}
                    value={values.name}
                  />
                  <div style={{ padding: "14px" }} />
                  <TextField
                    id="description"
                    name="description"
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    value={values.description}
                  />
                  <StyledIndicatorLink>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Indicators</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <FieldArray name="indicators">
                            {arrayHelpers => {
                              return indicators.map(indicator => {
                                return (
                                  <TableRow key={indicator.id}>
                                    <TableCell>{indicator.name} </TableCell>
                                  </TableRow>
                                );
                              });
                            }}
                          </FieldArray>
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
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default ScenarioForm;

/*
 *<input
                                            type="checkbox"
                                            checked={
                                              values.indicators.findIndex(
                                                ind => ind.id === indicator.id
                                              ) !== -1
                                            }
                                            onChange={e => {
                                              if (e.target.checked) {
                                                arrayHelpers.push(indicator);
                                              } else {
                                                arrayHelpers.remove(
                                                  values.indicators.findIndex(
                                                    ind =>
                                                      ind.id === indicator.id
                                                  )
                                                );
                                              }
                                            }}
                                          />
 *
 *
 *
 * */
