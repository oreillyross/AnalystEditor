import React from "react";
import { Formik, Form } from "formik";
import { StyledHeader } from "../styles/common";
import { Input } from "semantic-ui-react";

const SearchTagBar = () => {
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {props => (
        <Form
        autoComplete='off'
          style={{ backgroundColor: "white" }}
          onSubmit={props.handleSubmit}
        >
          <Input
            icon="tags"
            iconPosition="left"
            action={{
              type: "search",
              content: "search",
              onClick: () => {
                alert("clciked");
              }
            }}
            labelPosition="right"
            name="name"
            fluid
            placeholder="search for a tag here..."
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SearchTagBar;
