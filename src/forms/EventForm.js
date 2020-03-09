import React from "react";
import { Formik, FieldArray } from "formik";
import { StyledHeader } from "../styles/common";
import AddTagBar from "../components/AddTagBar";
import IndicatorDisplay from "../components/IndicatorDisplay";
import { Divider, Form, Button, TextArea, Message } from "semantic-ui-react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import styled from "styled-components";
import Tag from "../components/Tag";
import { GET_TAGS, ADD_EVENT } from "../queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

const eventValidationSchema = new yup.object({
  eventText: yup.string().required()
});

const StyledContainer = styled.div`
  text-align: left;
  padding: 1rem;
`;

function EventForm({
  articleSelectedText,
  article = {
    title: "Coronavirus is here",
    source: "BBC News",
    published: "05 March 2020"
  }
}) {
  const [addEvent] = useMutation(ADD_EVENT);
  const now = new Date();
  const { data: tagData } = useQuery(GET_TAGS);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    if (tagData) {
      setTags(tagData.Tags);
    }
  }, [tagData]);
  console.log(article.published);
  return (
    <div>
      <StyledHeader>Event Form </StyledHeader>
      <Divider />
      <Formik
        initialValues={{
          eventText: articleSelectedText,
          eventDate: now,
          tags: []
        }}
        validationSchema={eventValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            addEvent({
              variables: {
                sourceID: article.Article_Source_Link.id,
                text: values.eventText,
                created: values.eventDate
              }
            });
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
                  <TextareaAutosize
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
                    <strong>{article.title}</strong>{" "}
                    <div>
                      <Divider />({article.Article_Source_Link.name}){" "}
                    </div>{" "}
                    <div>
                      published on{" "}
                      {format(new Date(article.published), "iii do MMM yyyy")}
                    </div>
                  </p>
                </Message>

                <Form.Field>
                  <label>Tags</label>
                  <Paper variant="outlined">
                    <FieldArray name="tags">
                      {arrayHelpers => {
                        return (
                          <React.Fragment>
                            <AddTagBar
                              initialTags={tags}
                              addTag={selectedItem => {
                                if (
                                  selectedItem &&
                                  !values.tags.some(
                                    tag => tag.id === selectedItem.id
                                  )
                                )
                                  arrayHelpers.push(selectedItem);
                              }}
                            />
                            <Divider />
                            <StyledContainer>
                              {values.tags.map((tag, index) => {
                                return (
                                  <Tag
                                    key={tag.id}
                                    name={tag.name}
                                    deleteTag={() => arrayHelpers.remove(index)}
                                  />
                                );
                              })}
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
