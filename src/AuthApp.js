import React from "react";
import { Router, Link } from "@reach/router";
import Home from "./components/Home";
import * as ROUTES from "./constants/routes";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import SourceAdmin from "./Source/SourceAdmin";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "./queries";
import { Button } from "semantic-ui-react";
import "./AuthApp.css";
import { AuthAppProvider } from "./utils/context";
import Articles from "./views/Articles";
import { Events } from "./views/Events";
import EventForm from "./forms/EventForm";

function AuthApp({ authUser }) {
  //TODO Hardcoded the uid for a user to ease completion of UI etc.

  const authenticatedUser = authUser || { uid: "PPLUT0mIGZbGZlOnZ4qFAmPzO9H2" };
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { uid: authenticatedUser.uid }
  });

  // store the logged in userId here
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    if (data) {
      setUserId(data.Users[0].id);
    }
  }, [data]);

  return (
    <AuthAppProvider>
      <div className="container">
        <header className="header">Horizon - investigating the future</header>
        <aside className="nav">
          <Navigation />
        </aside>
        <main className="main">
          <div>
            {data && (
              <span>Current logged in user is: {data.Users[0].name}</span>
            )}
          </div>
          <Router>
            <Home path={ROUTES.HOME} />
            <SourceAdmin path={ROUTES.SOURCE_ADMIN_FORM} />
            <Articles path={ROUTES.SCRAPED_ARTICLES} />
            <Events path={ROUTES.EVENTS} />
            <EventForm path={ROUTES.EVENT_FORM} />
            <NotFound default />
          </Router>
        </main>
        <footer className="footer">
          Used to show metadata information on what is presented in the main
          screen
        </footer>
      </div>
    </AuthAppProvider>
  );
}

export default AuthApp;
