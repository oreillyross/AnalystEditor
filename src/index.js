import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// // import "react-datepicker/dist/react-datepicker.css";
// // import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "react-bootstrap-typeahead/css/Typeahead.css";
// // import Firebase, { FirebaseContext } from "./components/Firebase";
// // import ApolloClient from "apollo-client";
// // import { ApolloLink } from "apollo-link";
// // import { ApolloProvider } from "@apollo/react-hooks";
// // import { InMemoryCache } from "apollo-cache-inmemory";
// // import httplink from "./http-link";
// // import errorlink from "./error-link";
// //import { alink } from "./alink.js";

// const link = new ApolloLink.from([errorlink, httplink]);

// the Apollo cache is set up automatically
// const client = new ApolloClient({
//   link: alink.concat(link),
//   cache: new InMemoryCache(),
//   fetchOptions: {
//     mode: "cors"
//   }
// });

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
