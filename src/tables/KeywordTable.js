import React from "react";
import Tag from "../components/Tag";
import SearchBar from "../components/SearchBar";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_KEYWORDS = gql`
  query getKeywords {
    Keywords {
      id
      name
      typeKeyword
    }
  }
`;

const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function KeywordTable() {
  const { loading, data, error } = useQuery(GET_KEYWORDS);
  if (loading) return null;
  if (error) return <div>Oops, something went wrong...</div>;
  if (data)
    return (
      <div>
        Keywords
        <div>
          <SearchBar />
        </div>
        <StyledTags>
          {data.Keywords.map(keyword => (
            <Tag key={keyword.name} name={keyword.name} type={keyword.typeKeyword} />
          ))}
        </StyledTags>
      </div>
    );
}

export default KeywordTable;
