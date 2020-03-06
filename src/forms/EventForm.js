import React from "react";
import { Formik, FieldArray } from "formik";
import { StyledHeader } from "../styles/common";
import AddTagBar from "../components/AddTagBar";
import IndicatorDisplay from "../components/IndicatorDisplay";
import { Divider, Form, Button, TextArea, Message } from "semantic-ui-react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import styled from "styled-components";
import Tag from "../components/Tag";
import { GET_TAGS } from '../queries'
import { useQuery } from '@apollo/react-hooks'


const eventValidationSchema = new yup.object({
  eventText: yup.string().required()
});

const StyledContainer = styled.div`
  text-align: left;
  padding: 1rem;
`;

function EventForm({
  selectedEventText,
  article = {
    title: "Coronavirus is here",
    source: "BBC News",
    published: "05 March 2020"
  }
}) {


  const now = new Date();
  const {data: tagData} = useQuery(GET_TAGS)
  const initialTags = (tagData) ? tagData.Tags : []
 
  

  return (
    <div>
      <StyledHeader>Event Form </StyledHeader>
      <Divider />
      <Formik
        initialValues={{ eventText: "", eventDate: now, tags: [{id: '123', name: 'one'}] }}
        validationSchema={eventValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 4);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label> Event Text </label>
                  <TextArea
                    rows={3}
                    name="eventText"
                    value={values.eventText}
                    onChange={handleChange}
                  />
                </Form.Field>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container>
                    <Form.Field>
                      <label> Date </label>
                      <KeyboardDatePicker
                        variant="inline"
                        format="dd MMMM yyyy"
                        name="eventDate"
                        value={values.eventDate}
                        onChange={date => setFieldValue("eventDate", date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label> Time </label>
                      <KeyboardTimePicker
                        value={values.eventDate}
                        name="eventDate"
                        onChange={date => setFieldValue("eventDate", date)}
                        KeyboardButtonProps={{
                          "aria-label": "change time"
                        }}
                      />
                    </Form.Field>
                  </Grid>
                </MuiPickersUtilsProvider>
                <Message info>
                  <Message.Header>Source of information</Message.Header>
                  <Divider />
                  <p>
                    <strong>{article.title}</strong> by {article.source}{" "}
                    published on {article.published}
                  </p>
                </Message>

                <Form.Field>
                  <label>Tags</label>
                  <Paper variant="outlined">
                    <FieldArray name="tags">
                      {arrayHelpers => {
                        
                        return (
                          <React.Fragment>
                            <AddTagBar initialTags={initialTags}/>
                            <Divider />
                            <StyledContainer>
                              {!values.tags.length ? (
                                <div
                                  style={{ padding: "1rem" }}
                                  data-testid="notags"
                                >
                                  no tags yet
                                </div>
                              ) : (
                                values.tags.map((tag, index) => {
                                  return (
                                    <Tag
                                      key={tag.id}
                                      name={tag.name}
                                      deleteTag={() =>
                                        arrayHelpers.remove(index)
                                      }
                                    />
                                  );
                                })
                              )}
                            </StyledContainer>
                          </React.Fragment>
                        );
                      }}
                    </FieldArray>
                  </Paper>
                </Form.Field>
                <Form.Field>
                  <label>Indicators</label>
                  <Paper variant="outlined">
                    <AddTagBar />
                    <Divider />
                    <IndicatorDisplay />
                  </Paper>
                </Form.Field>

                <Button fluid basic color="blue" type="submit">
                  {" "}
                  Create Event{" "}
                </Button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default EventForm;
