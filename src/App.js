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
import EventTable from "./tables/EventTable";
import Articles from "./views/Articles";
import TextSelect from "./components/TextSelect";
import { article } from "./components/article";
import NewArticleForm from "./forms/NewArticleForm";
import KeywordForm from "./forms/KeywordForm";
import Tags from './views/Tags'
import Keywords from './views/Keywords'
import Sources from './views/Sources'
import Search from './views/Search'
import SourceForm from './forms/SourceForm'
import EventForm from './forms/EventForm'


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
          <Link to="/keywords">
            <Button>Keywords</Button>
          </Link>
          <Link to="/sources">
            <Button>Sources</Button>
          </Link>
          <Link to="/search">
            <Button>Search</Button>
          </Link>
          <Link to="/scenarios">
            <Button>Scenarios</Button>
          </Link>
          <Link to="/indicators">
            <Button>Indicators</Button>
          </Link>
        </StyledNavigation>
        <Router>
          <TextSelect article={article} path="/" />
          <Articles path="/articles" />
          <EventForm path="/admin" />
          <EventTable path="/events" />
          <NewArticleForm path="forms/newarticle" />
          <KeywordForm path="forms/newkeyword" />
          <SourceForm path='/forms/newsource'/>
          <Tags path="/tags"/>
          <Keywords path='/keywords'/>
          <Sources path='/sources' />
          <Search path='/search' />
          <NotFound default />
        </Router>
      </StyledDashboard>
    </ApolloProvider>
  );
}
