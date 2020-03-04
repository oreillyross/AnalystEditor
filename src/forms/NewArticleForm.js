import React from "react";
import { Formik } from "formik";
import { Form, Button, Message } from "semantic-ui-react";
import { StyledHeader } from "../styles/common";
import DatePicker from "react-datepicker";
import * as yup from "yup";
import  isEmpty  from 'lodash.isempty'


const newArticleValidSchema = yup.object().shape({
  title: yup.string().required(),
  published: yup
    .date()
    .required()
    .default(() => new Date())
});

const addArticle = () => {
  //placeholder
};

function NewArticleForm() {
 
  return (
    <div>
      <StyledHeader>Add new article</StyledHeader>
      <Formik
        validationSchema={newArticleValidSchema}
        initialValues={{ title: "", published: new Date() }}
        onSubmit={(values, actions) => {
          
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          addArticle({
            variables: {
              name: values.title
            }
          }).then(result => console.log(result));
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
                label="a date"
              />

              <label>Date</label>
              <DatePicker
                name="published"
                dateFormat="MMMM d yyyy"
                selected={values.published}
                onChange={date => setFieldValue("published", date)}
              />
            </Form.Field>
            <Message
              warning
              color='red'
              header="Oops you seem to be missing some details!"
              list={[errors.title, errors.published]}
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

export default NewArticleForm;
