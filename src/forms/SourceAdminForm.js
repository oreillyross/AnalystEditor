import React from "react";
import { Formik, Form, Field } from "formik";

//TODO needs to show name, url, keywords, frequency (1hr, 3hrs, 6hrs etc.)
export default function SourceAdminForm() {
  return (
    <div>
      <form>
        <input name="name" />
        <input type="url" name="url" />
        <textarea name="keywords" name="keywords" />
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
