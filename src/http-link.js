import { HttpLink } from "apollo-link-http";

export default new HttpLink({
  uri: "https://horizon-me.herokuapp.com/v1/graphql"
});
