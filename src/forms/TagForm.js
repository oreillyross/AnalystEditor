import React from "react";
import { Formik, Form } from "formik";
import { FormControl } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { StyledHeader } from "../styles/common";
import { Input } from "semantic-ui-react";

const ADD_TAG = gql`
  mutation addTag($name: String) {
    __typename
    insert_Tags(objects: { name: $name }) {
      affected_rows
    }
  }
`;
function showDialog() {
  alert("record added");
}

const TagForm = ({children}) => {
  const [addTag] = useMutation(ADD_TAG, {
    onCompleted: () => {
      showDialog();
    }
  });

  return (
    <div>
      <StyledHeader>Tags</StyledHeader>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          addTag({
            variables: {
              name: values.name
            }
          }).then(result => console.log(result));
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = "missing tag";
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
              <Input
                icon="tags"
                iconPosition="left"
                action={{
                  type: "submit",
                  content: "Add Tag",
                  onClick: () => {
                    alert("clciked");
                  }
                }}
                labelPosition="right"
                name="name"
                placeholder="type tag name here..."
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
              />
            </FormControl>
          </Form>
        )}
      </Formik>
      {children}
    </div>
  );
};

export default TagForm;
