import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./SourceAdminForm.module.css";

//TODO needs to show name, url, keywords, frequency (1hr, 3hrs, 6hrs etc.)
export default function SourceAdminForm() {
  return (
    <div>
      <Formik
        initialValues={{ name: "", url: "", keywords: "" }}
        onSubmit={e => {
          console.log("in submit form");
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="form-group">
              <label for="name"> Souce Name</label>
              <input
                className="form-control"
                placeholder="source name"
                name="name"
              />
            </div>
            <div className="form-group">
              <label for="url">Website url</label>
              <input
                className="form-control"
                type="url"
                name="url"
                placeholder="homepage of website"
              />
            </div>
            <div className="form-group">
              <label>Keywords</label>
              <textarea
                className="form-control"
                name="keywords"
                name="keywords"
                placeholder="list of keywords delimited by a comma"
              />
            </div>
            <div className="form-group">
              <label for="frequency">Enter a search frequency</label>
              <select
                name="frequency"
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
          </form>
        )}
      </Formik>
    </div>
  );
}
