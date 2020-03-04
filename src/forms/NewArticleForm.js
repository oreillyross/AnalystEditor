import React from "react";
import { Formik } from "formik";
import { Form, Button, Message } from "semantic-ui-react";
import { StyledHeader } from "../styles/common";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import isEmpty from "lodash.isempty";
import { Dropdown } from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_SOURCES = gql`
  query getSources {
    Sources(order_by: { name: asc }) {
      id
      name
    }
  }
`;

const newArticleValidSchema = yup.object().shape({
  title: yup.string().required(),
  published: yup
    .date()
    .required()
    .default(() => new Date()),
  author: yup.string(),
  url: yup.string().url()
});

function NewArticleForm() {
  const { data, loading } = useQuery(GET_SOURCES);
  if (loading) return null;
  /*TODO find a better way of pre-loading the sources and keep
  closer to the actual select component*/
  if (data) {
    const sources = [
      ...data.Sources.map(source => {
        return { key: source.id, value: source.id, text: source.name };
      }),
      { key: 0, value: "", text: "" }
    ];

    return (
      <div>
        <StyledHeader>Add new article</StyledHeader>

        <Formik
          validationSchema={newArticleValidSchema}
          initialValues={{
            title: "",
            published: new Date(),
            author: "",
            url: "",
            source_id: ""
          }}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            touched
          }) => (
            <Form
              warning={!isEmpty(errors)}
              style={{ backgroundColor: "white" }}
              onSubmit={handleSubmit}
            >
              <Form.Field>
                <label>Title </label>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  name="title"
                />

                <label>Date</label>
                <DatePicker
                  name="published"
                  dateFormat="MMMM d yyyy"
                  selected={values.published}
                  onChange={date => setFieldValue("published", date)}
                />
                <label>Source </label>
                <Dropdown
                  placeholder="select a source"
                  fluid
                  search
                  selection
                  options={sources}
                  onChange={(_, sources) => {
                    setFieldValue("source_id", sources.value);
                  }}
                  value={values.source_id}
                  name="source_id"
                />
                <label>Author </label>
                <input
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author}
                  name="author"
                />
                <label>Website Url </label>
                <input
                  type="url"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.url}
                  name="url"
                />
              </Form.Field>
              <Message
                warning
                color="red"
                header="Oops you seem to be missing some details!"
                list={[
                  touched.title && errors.title,
                  touched.published && errors.published,
                  touched.author && errors.author,
                  touched.url && errors.url
                ]}
              />

              <Button basic color="blue" fluid type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default NewArticleForm;
