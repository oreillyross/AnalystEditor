import React from "react";
import { Router } from "@reach/router";
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
import Tag from "./views/Tag";
import Scenarios from "./views/Scenarios";
import ScenarioForm from "./forms/ScenarioForm";
import Indicators from "./views/Indicators";
import { IndicatorsByScenarioId } from "./views/IndicatorsByScenarioId";
import IndicatorForm from "./forms/IndicatorForm";
import Scenario from "./views/Scenario.js";
import { Indicator } from "./views/Indicator";
import SignOutButton from "./components/SignOut";
import Home from "./components/Home";
import * as ROUTES from "./constants/routes";
import NotFound from "./components/NotFound";
import styled from "styled-components";
import Navigation from "./components/Navigation";
import Project from "./components/Project";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const Main = styled.div`
  grid-column: 4 / 13;
`;
const StyledNavigation = styled.div`
  grid-column: 1 / 4;
`;

function AuthApp({ authUser }) {
  return (
    <Container>
      <StyledNavigation>
        <Navigation authUser={authUser} />
      </StyledNavigation>
      <Main>
        <Router>
          <Home path={ROUTES.HOME} />
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
          <Project path="/project/:id" />
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
      </Main>
    </Container>
  );
}

export default AuthApp;
