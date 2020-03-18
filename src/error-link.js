import { onError } from "apollo-link-error";

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors[0].extensions.message);
    if (graphQLErrors[0].message.includes("delete")) {
      //todo put a custom error modal dialog here
      alert(`Cannot delete this tag becuase it is linked to events, first remove the 
      tags from the events.`);
    }
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export default errorlink;
