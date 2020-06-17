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
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "./queries";
import Projects from "./views/Projects";

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
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { uid: authUser.uid }
  });

  // store the logged in userId here
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setUserId(data.Users[0].id);
    }
  }, [data]);
  return (
    <Container>
      <StyledNavigation>
        <Navigation userId={userId} />
      </StyledNavigation>
      <Main>
        <div>
          {data && <span>Current logged in user is: {data.Users[0].name}</span>}
        </div>
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
          <Project path="/project/:userId" />
          <Projects path={ROUTES.PROJECTS_BY_USER} />
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
