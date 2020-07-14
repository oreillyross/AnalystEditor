import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./SourceAdminForm.module.css";

export default function SourceAdminForm() {
  return (
    <div>
      <Formik
        initialValues={{ name: "", url: "", keywords: "", frequency: "5 mins" }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form className={styles.form}>
            <div className="form-group">
              <label htmlFor="name"> Source Name</label>
              <input
                onChange={handleChange}
                value={values.name}
                className="form-control"
                placeholder="source name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">Website url</label>
              <input
                onChange={handleChange}
                value={values.url}
                className="form-control"
                // type="url"
                name="url"
                placeholder="homepage of website"
              />
            </div>
            <div className="form-group">
              <label>Keywords</label>
              <textarea
                onChange={handleChange}
                value={values.keywords}
                className="form-control"
                name="keywords"
                name="keywords"
                placeholder="list of keywords delimited by a comma"
              />
            </div>
            <div className="form-group">
              <label htmlFor="frequency">Enter a search frequency</label>
              <select
                name="frequency"
                onChange={handleChange}
                value={values.frequency}
                className="custom-select custom-select-sm"
              >
                <option>every 5 mins</option>
                <option>every 1 hour</option>
                <option>every 2 hours</option>
                <option>every 5 hours</option>
                <option>every 12 hours</option>
              </select>
            </div>
            <div className="center">
              <button className="btn btn-lg btn-outline-primary" type="submit">
                {" "}
                Submit{" "}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
