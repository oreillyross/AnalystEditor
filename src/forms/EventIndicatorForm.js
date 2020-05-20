import React from "react";
import { Formik, Form, FieldArray } from "formik";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { GET_INDICATORS, ADD_EVENT } from "../queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const StyledForm = styled.div`
  margin: 24px;
  border: 1px solid grey;
`;

const StyledHeading = styled.div`
  text-align: center;
`;
const iindicators = [
  { id: "1234", name: "One", strength: 2 },
  { id: "2345", name: "Two", strength: 4 },
  { id: "5678", name: "Three", strength: 6 }
];

const prevIndicators = [{ id: "2345", name: "Two", strength: 4 }];

const initialValues = { name: "", indicators: prevIndicators };

function EventIndicatorForm() {
  const { data: indicatorData, error: indicatorError } = useQuery(
    GET_INDICATORS
  );

  async function getIndicators() {
    const indicatorsfromDB = await indicatorData;
    console.log(indicatorsfromDB);
    //return indicatorsfromDB.Indicators.map(ind => { return {id: ind.id, name: ind.name, strength: 5}})
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
    >
      {({ values, handleChange }) => {
        return (
          <Form>
            <StyledForm>
              <StyledHeading> Event Form</StyledHeading>
              <input
                type="text"
                onChange={handleChange}
                name="name"
                value={values.name}
              />
              <FieldArray name="indicators">
                {arrayHelpers => {
                  if (!indicatorData) return null;
                  else
                    return indicatorData.Indicators.map((indicator, index) => {
                      return (
                        <li key={indicator.id}>
                          {" "}
                          <input
                            type="checkbox"
                            checked={
                              values.indicators.findIndex(
                                ind => ind.id === indicator.id
                              ) !== -1
                            }
                            value={`indicators[${index}].id`}
                            onChange={e => {
                              if (e.target.checked) {
                                arrayHelpers.push(indicator);
                              } else {
                                arrayHelpers.remove(
                                  values.indicators.findIndex(
                                    ind => ind.id === indicator.id
                                  )
                                );
                              }
                            }}
                          />{" "}
                          {indicator.name}
                        </li>
                      );
                    });
                }}
              </FieldArray>
              <Button fluid type="submit">
                Save Event{" "}
              </Button>
            </StyledForm>
          </Form>
        );
      }}
    </Formik>
  );
}

export { EventIndicatorForm };
