import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { ArticleTable } from "./ArticleTable";
import { Router, Link } from "@reach/router";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import ApolloClient from "apollo-client";
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import httplink from "./http-link";
import errorlink from './error-link'
import { articles } from "./graphql-queries";
import Landing from "./Landing";
import { Admin } from "./Admin";
import  EventTable  from './EventTable'

const link = new ApolloLink.from([errorlink, httplink])

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

const StyledToggleOption = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

function NotFound() {
  return <div>Not found</div>;
}

function Home() {
  const { loading, error, data } = useQuery(articles);
  if (loading) return null;
  if (error) return <div>Error</div>;
  if (data) console.log(data);
  return <Landing />;
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
          <Home path="/" />

          <ArticleTable path="/articles" />
          <Admin path="/admin" />
<EventTable path='/events'/>
          <NotFound default />
        </Router>
      </StyledDashboard>
    </ApolloProvider>
  );
}
