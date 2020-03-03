import React from "react";
import Tagtable from "../tables/TagTable";
import { Paper } from "@material-ui/core";
import { StyledHeader } from "../styles/common";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Input, Button } from "semantic-ui-react";
import useFuse from "react-use-fuse";

const options = {
  shouldSort: true,
  threshold: 0.1,
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

const ADD_TAG = gql`
  mutation addTag($name: String) {
    __typename
    insert_Tags(objects: { name: $name }) {
      returning {
        id
        name
      }
      affected_rows
    }
  }
`;

function Tags() {
  const { data, loading } = useQuery(GET_TAGS);
  const [value, setValue] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const { result, search, reset } = useFuse({ data: tags, options });
  const [addTag] = useMutation(ADD_TAG);
  React.useEffect(() => {
    if (data) {
      setTags(data.Tags);
    }
  }, [data]);

  if (loading) return null;

  function onChange(e) {
    setValue(e.target.value);
    search(e.target.value);
  }

  const onAddTag = () => {
    if (value !== "") {
      addTag({
        variables: { name: value },
        update(cache, { data }) {
          const getExistingTags = cache.readQuery({ query: GET_TAGS });
          const existingTags = getExistingTags ? getExistingTags.Tags : [];
          const newTag = data.insert_Tags ? data.insert_Tags.returning[0] : {};
          cache.writeQuery({
            query: GET_TAGS,
            data: { Tags: [newTag, ...existingTags] }
          });
        }
      }).then(() => {
        
        setValue("");
        reset();
      });
    }
  };

  return (
    <Paper elevation={2}>
      <StyledHeader>Tags </StyledHeader>

      <Input
        autoComplete="off"
        icon="tags"
        iconPosition="left"
        labelPosition="right"
        name="tagName"
        fluid
        placeholder="search for a tag here..."
        type="text"
        value={value}
        onChange={onChange}
      />
      {result.length === 0 ? (
        <Button fluid basic color="blue" onClick={onAddTag}>
          Add New Tag
        </Button>
      ) : null}

      <Tagtable tags={result} />
    </Paper>
  );
}

export default Tags;
