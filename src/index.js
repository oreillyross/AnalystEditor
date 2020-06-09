import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-datepicker/dist/react-datepicker.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Firebase, { FirebaseContext } from "./components/Firebase";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  rootElement
);
