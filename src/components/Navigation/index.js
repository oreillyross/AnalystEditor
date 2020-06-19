import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import * as ROUTES from "../../constants/routes";
import { Icon, Button } from "semantic-ui-react";
import "./Navigation.css";

function Navigation({ userId }) {
  return (
    <>
      <div className="content">
        <Button basic color="blue">
          Create a new project
        </Button>
        <Link to={`/projects/${userId}`}>Projects </Link>
      </div>
    </>
  );
}

export default Navigation;
