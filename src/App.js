import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Router, Link } from "@reach/router";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import httplink from "./http-link";
import errorlink from "./error-link";
import { Admin } from "./views/Admin";
import EventTable from "./tables/EventTable";
import Articles from './views/Articles'
import TextSelect from './components/TextSelect'
import { article } from './components/article'

const link = new ApolloLink.from([errorlink, httplink]);

// the Apollo cache is set up automatically
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "cors"
  }
});

const StyledDashboard = styled.div`
  display: grid;
`;

const StyledHeader = styled.div`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  padding: 0.5rem;
`;

const StyledNavigation = styled.div`
  border-bottom: 1px solid lightgray;
`;



function NotFound() {
  return <div>Not found</div>;
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StyledDashboard>
        <StyledHeader>Horizon Analyst Dashboard</StyledHeader>
        <StyledNavigation>
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/admin">
            <Button>Admin</Button>
          </Link>
          <Link to="/articles">
            <Button>Articles</Button>
          </Link>
          <Link to="/events">
            <Button>Events</Button>
          </Link>
          <Link to="/tags">
            <Button>Tags</Button>
          </Link>
        </StyledNavigation>
        <Router>
          <TextSelect article={article} path="/" />
          <Articles path="/articles" />
          <Admin path="/admin" />
          <EventTable path="/events" />
          <NotFound default />
        </Router>
      </StyledDashboard>
    </ApolloProvider>
  );
}
