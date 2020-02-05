import React from "react";
import styled from 'styled-components'
import { ArticleTable } from './ArticleTable'

const StyledDashboard = styled.div`
  display: grid;
`

const StyledHeader = styled.div`
text-align: center;
font-family: "Roboto", sans-serif;
font-weight: bold;
padding: .5rem
`

const StyledTable = styled.div`
  background-color: green;
  margin: .5rem
`

export default function App() {
  return (
    <StyledDashboard>
      <StyledHeader>Horizon Analyst Dashboard</StyledHeader>
<StyledTable><ArticleTable/></StyledTable>
    </StyledDashboard>
  );
}
