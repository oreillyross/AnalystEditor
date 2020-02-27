import React from "react";
import { Formik, Form } from "formik";
import {
  OutlinedInput,
  Button,
  FormControl,
  makeStyles
} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const ADD_KEYWORD = gql`
  mutation addKeyword($name: String!) {
    __typename
    insert_Keywords(objects: { name: $name }) {
      returning {
        id
        name
      }
      affected_rows
    }
  }
`;
function showDialog() {
  alert("record added");
}

const useStyles = makeStyles({
  input: {
    borderRadius: "25px"
  }
});

const KeywordForm = () => {
  const classes = useStyles();

  const [addKeyword] = useMutation(ADD_KEYWORD, {
    onCompleted: () => {
      showDialog();
    }
  });

  return (
    <div>
      <h1>Keyword Form</h1>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          addKeyword({
            variables: {
              name: values.name
            }
          }).then(result => console.log(result));
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "A keyword is required";
          }
          return errors;
        }}
      >
        {props => (
          <Form
            style={{ backgroundColor: "white" }}
            onSubmit={props.handleSubmit}
          >
            <FormControl fullWidth>
              <OutlinedInput
                className={classes.input}
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
                fullWidth
              />
              {props.errors.name && <div>{props.errors.name}</div>}
              <Button fullWidth type="submit">
                Submit
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default KeywordForm;
