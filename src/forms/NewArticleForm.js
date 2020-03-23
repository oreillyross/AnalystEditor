import React from "react";
import { Formik } from "formik";
import { Form, Button, Message, Dropdown, TextArea } from "semantic-ui-react";
import { StyledHeader } from "../styles/common";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import isEmpty from "lodash.isempty";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ARTICLES } from "../queries";

const GET_SOURCES = gql`
  query getSources {
    Sources(order_by: { name: asc }) {
      id
      name
    }
  }
`;

const ADD_ARTICLE = gql`
  mutation addArticle(
    $title: String!
    $published: date
    $author: String
    $url: String
    $text: String
    $source_id: uuid
  ) {
    insert_Articles(
      objects: {
        title: $title
        published: $published
        source_id: $source_id
        author: $author
        url: $url
        text: $text
      }
    ) {
      affected_rows
      returning {
        __typename
        author
        published
        id
        text
        title
        url
        Article_Source_Link {
          id
          name
        }
      }
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

function NewArticleForm({ navigate }) {
  const { data, loading } = useQuery(GET_SOURCES);
  const [addArticle] = useMutation(ADD_ARTICLE);

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
            source_id: null,
            text: ""
          }}
          onSubmit={(values, actions) => {
            addArticle({
              variables: {
                title: values.title,
                published: values.published,
                source_id: values.source_id,
                author: values.author,
                url: values.url,
                text: values.text
              },
              update(cache, { data }) {
                console.table(data);
                const getExistingArticles = cache.readQuery({
                  query: GET_ARTICLES
                });
                const existingArticles = getExistingArticles
                  ? getExistingArticles.Articles
                  : [];
                console.log(existingArticles.length);
                const newArticle = data.insert_Articles
                  ? data.insert_Articles.returning[0]
                  : {};
                console.log("NEW ARTICLE" + newArticle.title);
                cache.writeQuery({
                  query: GET_ARTICLES,
                  data: { Articles: { newArticle, ...existingArticles } }
                });
                return null;
              }
            }).then(() => {
              navigate("/articles");
            });
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
                <label>Text </label>
                <TextArea
                  placeholder="copy the text of the article here"
                  rows={20}
                  name="text"
                  value={values.text}
                  onChange={handleChange}
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
