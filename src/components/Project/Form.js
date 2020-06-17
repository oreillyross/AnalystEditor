import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Form as UIForm,
  Input,
  Button,
  TextArea,
  Checkbox,
  Icon
} from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROJECT, GET_SOURCES, GET_SCRAPING } from "../../queries";

function ProjectForm({ project }) {
  const {
    loading: sourceLoading,
    error: sourceError,
    data: sourceData
  } = useQuery(GET_SOURCES);

  const {
    loading: scrapingLoading,
    error: scrapingError,
    data: scrapingData
  } = useQuery(GET_SCRAPING, {
    variables: { projectId: project ? project.id : null }
  });

  if (sourceData && scrapingData) {
    const adminOptions = [{ text: "", value: "" }];
    console.log("never gets here");
    return (
      <div>
        <Formik
          initialValues={{
            title: project.title,
            description: project.description
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
                <h3> Source scraping </h3>
                <ul>
                  {sourceData.Sources.map(source => {
                    return (
                      <li key={source.id}>
                        <Checkbox />
                        {source.name}
                        <Icon name="delete" />
                      </li>
                    );
                  })}
                </ul>
                ); }} );
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
