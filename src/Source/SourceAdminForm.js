import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./SourceAdminForm.module.css";
import { AuthAppContext } from "../utils/context";
import { GET_SOURCES } from "../queries";
import { useQuery } from "@apollo/react-hooks";
import { Typeahead } from "react-bootstrap-typeahead";

export default function SourceAdminForm() {
  const prj = React.useContext(AuthAppContext);
  console.log(prj.project_id);
  const { loading, error, data } = useQuery(GET_SOURCES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error getting sources for the source admin form</div>;
  if (data) {
    const sources = data.Sources;
    console.log(sources);
    return (
      <Formik
        initialValues={{
          source_id: "",
          url: "",
          keywords: "",
          frequency: "every 5 mins"
        }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
          <Form className={styles.form}>
            <div className="form-group">
              <label htmlFor="name"> Source Name</label>
              <Typeahead
                id="source-names"
                labelKey="name"
                onChange={selected => {
                  console.log(selected);
                  const value = selected.length > 0 ? selected[0].id : "";
                  setFieldValue("source_id", value);
                  const url = selected.length > 0 ? selected[0].url : "";
                  setFieldValue("url", url);
                }}
                options={sources}
                placeholder="Select a source..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="url">Website url</label>
              <input
                onChange={handleChange}
                value={values.url}
                readonly
                className="form-control-plaintext"
                style={{ backgroundColor: "#F1FaEE", padding: "0 12px" }}
                type="url"
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
    );
  }
}
