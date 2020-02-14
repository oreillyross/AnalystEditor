import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { ArticleTable } from "./ArticleTable";
import { Router, Link } from "@reach/router";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";



// the Apollo cache is set up automatically
const client = new ApolloClient({
  uri: "https://horizon-me.herokuapp.com/v1/graphql",
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

function Admin() {
  return (
    <div>
      Admin
      </div>
  )
}

function Home() {
  return <div>Welcome</div>;
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
        </StyledNavigation>
        <Router>
          <Home path="/" />

          <ArticleTable path="/articles" />
          <Admin path="/admin" />
          <NotFound default />
        </Router>
      </StyledDashboard>
    </ApolloProvider>
  );
}
