import React from "react";
import { Formik, Form, Field } from "formik";
import { Form as UIForm, Input, Button, TextArea } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PROJECT } from "../../queries";

function ProjectForm({ userId }) {
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { user_id: userId }
  });
  if (data) {
    const adminOptions = [{ text: "", value: "" }];
    console.log(data.Projects[0]);
    return (
      <div>
        <Formik
          initialValues={{
            title: data.Projects[0].title,
            description: data.Projects[0].description
          }}
          onSubmit={(values, actions) => {
            console.log(values);
          }}
        >
          {({ values, handleSubmit, handleChange }) => {
            const { title, description } = values;
            return (
              <UIForm size="large" onSubmit={handleSubmit}>
                {" "}
                <UIForm.Input
                  label="Title"
                  required
                  placeholder="Give your project a meaningful name"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                />
                <UIForm.Field>
                  <label> Description </label>{" "}
                  <TextArea
                    type="text"
                    value={values.description}
                    placeholder="type a description for project"
                    name="description"
                    onChange={handleChange}
                  />
                </UIForm.Field>
                <UIForm.Dropdown
                  label="Administrator"
                  placeholder="Assign an admin to manage the project"
                  name="admin"
                  selection
                  options={adminOptions}
                />
                <Button type="submit">Save</Button>
              </UIForm>
            );
          }}
        </Formik>
      </div>
    );
  }
  return null;
}

export default ProjectForm;
