import React from "react";
import { Formik, Form, Field } from "formik";

//TODO needs to show name, url, keywords, frequency (1hr, 3hrs, 6hrs etc.)
export default function SourceAdminForm() {
  return (
    <div>
      <form>
        <input placeholder="source name" name="name" />
        <input type="url" name="url" placeholder="homepage of website" />
        <textarea
          name="keywords"
          name="keywords"
          placeholder="list of keywords delimited by a comma"
        />
        <select>
          <option>every 5 mins</option>
          <option>every 1 hour</option>
          <option>every 2 hours</option>
          <option>every 5 hours</option>
          <option>every 12 hours</option>
        </select>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}
