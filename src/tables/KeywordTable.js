import React from "react";
import Tag from "../components/Tag";
import SearchBar from "../components/SearchBar";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const Fuse = require("fuse.js");

const fuseOptions = {
  shouldSort: true,
  threshold: 0.0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

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
  const [value, setValue] = React.useState("");
  const onChange = event => {
    setValue(event.target.value);
  };
  if (loading) return null;
  if (error) return <div>Oops, something went wrong...</div>;
  if (data) {
    const serverkeywords = data.Keywords;
    let keywords = [];
    const fuse = new Fuse(serverkeywords, fuseOptions);
    const result = fuse.search(value);
    if (result.length === 0 && value === "") {
      keywords = serverkeywords;
      return (
        <div>
          Keywords
          <div>
            <SearchBar
              showAddButton={false}
              value={value}
              onChange={onChange}
            />
          </div>
          <StyledTags>
            {keywords.map(keyword => (
              <Tag
                key={keyword.name}
                name={keyword.name}
                type={keyword.typeKeyword}
              />
            ))}
          </StyledTags>
        </div>
      );
    } else {
      keywords = result;
      const showAddButton = keywords.length === 0;
      return (
        <div>
          Keywords
          <div>
            <SearchBar
              showAddButton={showAddButton}
              value={value}
              onChange={onChange}
            />
          </div>
          <StyledTags>
            {keywords.map(keyword => (
              <Tag
                key={keyword.name}
                name={keyword.name}
                type={keyword.typeKeyword}
              />
            ))}
          </StyledTags>
        </div>
      );
    }
  }
}

export default KeywordTable;
