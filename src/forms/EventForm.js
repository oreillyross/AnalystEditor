import React from "react";
import { Formik, FieldArray } from "formik";
import { StyledHeader } from "../styles/common";
import { AddTagBar } from "../components/AddTagBar";
import IndicatorDisplay from "../components/IndicatorDisplay";
import { Divider, Form, Message, Button } from "semantic-ui-react";
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
import {
  GET_TAGS,
  ADD_EVENT,
  ADD_EVENT_TAG_LINK,
  ADD_ARTICLE_EVENT_LINK
} from "../queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import * as ROUTES from "../constants/routes";

const eventValidationSchema = new yup.object({
  eventText: yup.string().required()
});

const StyledContainer = styled.div`
  text-align: left;
  padding: 1rem;
`;

EventForm.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedText: PropTypes.string.isRequired
    })
  })
};

function EventForm({ location }) {
  const eventText = location.state.selectedText;
  const article = location.state.article;
  const articleId = location.state.article.id;
  const [addEvent] = useMutation(ADD_EVENT);
  const [addEventTag] = useMutation(ADD_EVENT_TAG_LINK);
  const [addArticleEventLink] = useMutation(ADD_ARTICLE_EVENT_LINK);

  const now = new Date();
  const { data: tagData } = useQuery(GET_TAGS);
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    if (tagData) {
      setTags(tagData.Tags);
    }
  }, [tagData]);

  return (
    <div>
      <StyledHeader>Event Form </StyledHeader>
      <Divider />
      <Formik
        initialValues={{
          eventText: eventText,
          eventDate: now,
          tags: []
        }}
        validationSchema={eventValidationSchema}
        onSubmit={async values => {
          const { data } = await addEvent({
            variables: {
              sourceID: article.Article_Source_Link.id,
              text: values.eventText,
              created: values.eventDate
            }
          });
          const eventId = data.insert_Events.returning[0].id;
          console.log("addArticleLink", eventId, articleId);
          addArticleEventLink({
            variables: {
              eventId,
              articleId
            }
          });

          values.tags.map(formTag => {
            addEventTag({
              variables: {
                eventId,
                tagId: formTag.id
              }
            });

            return "success";
          });

          navigate(ROUTES.EVENTS);
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
                  <div>
                    <strong>{article.title}</strong>{" "}
                    <div>
                      <Divider />({article.Article_Source_Link.name}){" "}
                    </div>{" "}
                    <p>
                      published on{" "}
                      {format(new Date(article.published), "iii do MMM yyyy")}
                    </p>
                  </div>
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
