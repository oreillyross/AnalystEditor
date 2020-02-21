import { onError } from "apollo-link-error";

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    if (graphQLErrors[0].extensions.code === 'constraint-violation') {
alert('Record already exists')
    }
  }
    
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export default errorlink