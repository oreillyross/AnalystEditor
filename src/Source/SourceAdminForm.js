import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./SourceAdminForm.module.css";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_SOURCES, ADD_SOURCE_SCRAPING } from "../queries";

export default function SourceAdminForm() {
  const {
    loading: sourceLoading,
    error: sourceError,
    data: sourceData
  } = useQuery(GET_SOURCES);

  const [addSourceScraping] = useMutation(ADD_SOURCE_SCRAPING);

  if (sourceLoading) {
    return null;
  }

  if (sourceData) {
    return <authContext.Consumer>{({ projectId }) => {}}</authContext.Consumer>;
  }
}
