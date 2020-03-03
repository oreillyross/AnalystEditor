import React from "react";
import Tagtable from "../tables/TagTable";
import TagForm from "../forms/TagForm";
import SearchTagBar from "../components/SearchTagBar";
import { Paper } from "@material-ui/core";
import { StyledHeader } from "../styles/common";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Input } from "semantic-ui-react";
import useFuse from "react-use-fuse";

const options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

const GET_TAGS = gql`
  query getTags {
    Tags(order_by: { name: asc }) {
      id
      name
    }
  }
`;

const initialState = {
  tagName: ""
};

const tagReducer = (state, { field, value }) => {
  return {
    ...state,
    [field]: value
  };
};

function Tags() {
  const [state, dispatch] = React.useReducer(tagReducer, initialState);
  const { tagName } = state;
  const { data, loading } = useQuery(GET_TAGS);
  const [tags, setTags] = React.useState([]);
  const { result, search } = useFuse({ data: tags, options });

  React.useEffect(() => {
    if (data) {
      setTags(data.Tags);
    }
  }, [data]);

  if (loading) return null;

  function onChange(e) {
    dispatch({ field: e.target.name, value: e.target.value });
    search(tagName);
  }

  return (
    <Paper elevation={2}>
      <StyledHeader>Tags </StyledHeader>
      <Input
        icon="tags"
        iconPosition="left"
        action={{
          type: "search",
          content: "search",
          onClick: () => {
            alert("clciked");
          }
        }}
        labelPosition="right"
        name="tagName"
        fluid
        placeholder="search for a tag here..."
        type="text"
        value={tagName}
        onChange={onChange}
      />
      <Tagtable tags={result} />
    </Paper>
  );
}

export default Tags;
