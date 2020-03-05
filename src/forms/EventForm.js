import React from "react";
import { Formik } from "formik";
import { StyledHeader } from "../styles/common";
import { Divider, Form, Input, Button, TextArea } from "semantic-ui-react";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const eventValidationSchema = new yup.object({
  eventText: yup.string().required()
});

function EventForm({ selectedEventText, article }) {
  const now = new Date();

  return (
    <div>
      <StyledHeader>Event Form </StyledHeader>
      <Divider />
      <Formik
        initialValues={{ eventText: "", eventDate: now }}
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
                    fluid
                    name="eventText"
                    value={values.eventText}
                    onChange={handleChange}
                  />
                </Form.Field>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container >
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
