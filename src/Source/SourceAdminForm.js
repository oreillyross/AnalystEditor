import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./SourceAdminForm.module.css";
import { AuthAppContext } from "../utils/context";
import { GET_SOURCES, ADD_SOURCE_SCRAPING } from "../queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Typeahead } from "react-bootstrap-typeahead";
import Select from "react-select";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const frequencyOptions = [
  { label: "every 5 mins", value: 5 },
  { label: "every 10 mins", value: 10 }
];

function FrequencySelect(props) {
  return (
    <Select
      id="frequency"
      options={frequencyOptions}
      onChange={value => props.onChange("frequency", value)}
      onBlur={() => props.onBlur("frequency")}
      value={props.value}
    />
  );
}

export default function SourceAdminForm() {
  const prj = React.useContext(AuthAppContext);
  console.log(prj.project_id);
  const { loading, error, data } = useQuery(GET_SOURCES);
  const [addSourceScraping] = useMutation(ADD_SOURCE_SCRAPING);
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
          frequency: { label: "every 5 mins", value: 5 },
          scraping: "off"
        }}
        onSubmit={values => {
          console.log(values);
          addSourceScraping({
            variables: {
              project_id: prj.project_id,
              source_id: values.source_id,
              frequency: values.frequency.value,
              scraping: values.scraping
            }
          });
        }}
      >
        {props => (
          <Form className={styles.form}>
            <div className="form-group">
              <label htmlFor="name"> Source Name</label>
              <Typeahead
                id="source-names"
                labelKey="name"
                onChange={selected => {
                  console.log(selected);
                  const value = selected.length > 0 ? selected[0].id : "";
                  props.setFieldValue("source_id", value);
                  const url = selected.length > 0 ? selected[0].url : "";
                  props.setFieldValue("url", url);
                }}
                options={sources}
                placeholder="Select a source..."
              />

              <div style={{ margin: "12px" }}>
                <div>
                  <label htmlFor="scraping_toggle">Scraping On / Off</label>
                </div>
                <Toggle
                  id="scraping_toggle"
                  onChange={e =>
                    props.setFieldValue("scraping", e.target.checked)
                  }
                  checked={props.values.scraping}
                  name="scraping"
                  icons={false}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="url">Website url</label>
              <input
                onChange={props.handleChange}
                value={props.values.url}
                readOnly
                className="form-control-plaintext shadow-none"
                style={{ backgroundColor: "#F1FaEE", padding: "0 12px" }}
                type="url"
                name="url"
                placeholder="homepage of website"
              />
            </div>
            <div className="form-group">
              <label>Keywords</label>
              <textarea
                onChange={props.handleChange}
                value={props.values.keywords}
                className="form-control"
                name="keywords"
                name="keywords"
                placeholder="list of keywords delimited by a comma"
              />
            </div>
            <div className="form-group">
              <label htmlFor="frequency">Enter a search frequency</label>
              <FrequencySelect
                value={props.values.frequency}
                name="frequency"
                onBlur={props.setFieldTouched}
                onChange={props.setFieldValue}
                touched={props.touched.frequency}
              />
            </div>
            <div className="center">
              <button className="btn btn-lg btn-outline-primary" type="submit">
                {" "}
                Submit{" "}
              </button>
              <div>{JSON.stringify(props, null, 2)}</div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
