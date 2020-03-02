import React from 'react'
import { Formik, Form } from 'formik'
import { FormControl, OutlinedInput, Button, makeStyles } from '@material-ui/core'
import { StyledHeader } from '../styles/common'

const useStyles = makeStyles({
  header: {
    margin: 'auto',
    lineHeight:' 51px',
    verticalAlign: 'middle',
  },
  input: {

  }
});

const addArticle = () => {
  //placeholder
}

function NewArticleForm() {
  const classes = useStyles();
  
  return (
    <div>
      <StyledHeader>Add new article</StyledHeader>
      <Formik
        initialValues={{ title: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          addArticle({
            variables: {
              name: values.title
            }
          }).then(result => console.log(result));
        }}
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = "A keyword is required";
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
                value={props.values.title}
                name="title"
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

  )
}

export default NewArticleForm