import React from 'react'
import { Formik } from 'formik'
import { Form, Button } from 'semantic-ui-react'
import { StyledHeader } from '../styles/common'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



const addArticle = () => {
  //placeholder
}

function NewArticleForm() {
  
  const [articleDate, setArticleDate] = React.useState(new Date())

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
            errors.title = "A title is required";
          }
          return errors;
        }}
      >
        {props => (
          <Form
            style={{ backgroundColor: "white" }}
            onSubmit={props.handleSubmit}
          >
            <Form.Field>
              <label>Title </label>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.title}
                name="title"
                fullWidth
              />
              <label> Date</label>
                <DatePicker selected={articleDate} onChange={date => setArticleDate(date)}/>
              {props.errors.title && <div>{props.errors.title}</div>}
              </Form.Field>
              
              <Button basic color='blue fluid' type="submit">
                Submit
              </Button>
              
              
            
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default NewArticleForm