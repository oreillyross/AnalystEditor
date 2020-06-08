import React from "react";
import styled from "styled-components";
import { Router } from "@reach/router";
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
import Navigation from "./components/Navigation";
import * as ROUTES from "./constants/routes";

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

function NotFound() {
  return <div>Not found</div>;
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <StyledDashboard>
        <StyledHeader>Horizon Analyst Dashboard</StyledHeader>
        <Navigation />
        <Router>
          <TextSelect article={article} path={ROUTES.LANDING} />
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
