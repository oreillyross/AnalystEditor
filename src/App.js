import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { ArticleTable } from "./ArticleTable";
import { Router, Link } from "@reach/router";
import Toggle from 'react-toggle'
import "react-toggle/style.css" 

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
grid-template-columns: 1fr 1fr 
`

function NotFound() {
  return <div>Not found</div>;
}

function Admin() {
  return (<div><h3>Admin screen</h3>
   <StyledToggleOption>
    <span>Automated Search on</span>
  <Toggle
    icons={false}
    />
  </StyledToggleOption>

  </div>);
}

export default function App() {
  return (
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
  );
}
const Home = () => (
  <div>
    <h2>Welcome</h2>
  </div>
);
