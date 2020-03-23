import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import KeywordTable from "../tables/KeywordTable";

const Fuse = require("fuse.js");

const fuseOptions = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

const myState = {
  showKeywordForm: false,
  keywords: []
};

const reducer = (state, action) => {
  if (action.type === "toggleShowForm") {
    return { showingKeywordForm: !action.payload, ...state };
  }
  if (action.type === "") return state;
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

function KeywordView() {
  const { loading, data, error } = useQuery(GET_KEYWORDS);

  const [state, dispatch] = React.useReducer(reducer, myState);

  if (loading) return null;
  if (error) return <div>Oops, something went wrong...</div>;
  if (data) {
    const keywords = data.Keywords;

    return <KeywordTable keywords={keywords} />;
  }
}

export default KeywordView;
