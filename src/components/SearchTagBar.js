import React from "react";
import { Formik, Form } from "formik";
import { StyledHeader } from "../styles/common";
import { Input } from "semantic-ui-react";

const SearchTagBar = () => {
  return (
    <div>
      <StyledHeader>Tags</StyledHeader>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <Form
            style={{ backgroundColor: "white" }}
            onSubmit={props.handleSubmit}
          >
            <Input
              icon="tags"
              iconPosition="left"
              action={{
                type: "submit",
                content: "search",
                onClick: () => {
                  alert("clciked");
                }
              }}
              labelPosition="right"
              name="name"
              placeholder="search for a tag here..."
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchTagBar;
