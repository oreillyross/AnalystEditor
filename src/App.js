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
import { Events } from "./views/Events";
import { Event } from "./views/Event";
import Articles from "./views/Articles";
import TextSelect from "./components/TextSelect";
import { article } from "./components/article";
import NewArticleForm from "./forms/NewArticleForm";
import KeywordForm from "./forms/KeywordForm";
import Tags from "./views/Tags";
import Keywords from "./views/Keywords";
import Sources from "./views/Sources";
import Search from "./views/Search";
import SourceForm from "./forms/SourceForm";
import EventsByTag from "./tables/EventsByTag";
import { EventsByArticle } from "./views/EventsByArticle";
import EventForm from "./forms/EventForm";
import { alink } from "./alink.js";
import Tag from "./views/Tag";
import Scenarios from "./views/Scenarios";
import ScenarioForm from "./forms/ScenarioForm";
import Indicators from "./views/Indicators";
import { IndicatorsByScenarioId } from "./views/IndicatorsByScenarioId";
import IndicatorForm from "./forms/IndicatorForm";
import Scenario from "./views/Scenario.js";
import { Indicator } from "./views/Indicator";
import SignInScreen from "./components/Login";

const link = new ApolloLink.from([errorlink, httplink]);

// the Apollo cache is set up automatically
const client = new ApolloClient({
  link: alink.concat(link),
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
          <EventsByTag path="/events/bytag/:id" />
          <EventsByArticle path="/events/byarticle/:id" />
          <Events path="/events" />
          <EventForm path="/event/addevent" />
          <NewArticleForm path="forms/newarticle" />
          <KeywordForm path="forms/newkeyword" />
          <SourceForm path="/forms/newsource" />
          <IndicatorForm path="/forms/newindicator" />
          <ScenarioForm path="/forms/scenario" />
          <Scenario path="/views/scenario/:id" />
          <Event path="/views/event/:id" />
          <Tags path="/tags" />
          <Keywords path="/keywords" />
          <Sources path="/sources" />
          <Indicator path="/views/indicator/:id" />
          <Indicators path="/indicators" />
          <IndicatorsByScenarioId path="/indicators/byscenario/:id" />
          <Scenarios path="/scenarios" />
          <Search path="/search" />
          <Tag path="/tag/:id" />
          <NotFound default />
        </Router>
      </StyledDashboard>
    </ApolloProvider>
  );
}
