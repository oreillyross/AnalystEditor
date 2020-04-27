import React from "react";
import TagTable from "../tables/TagTable";
import { Paper } from "@material-ui/core";
import { StyledHeader } from "../styles/common";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Input, Button } from "semantic-ui-react";
import useFuse from "react-use-fuse";
import { GET_TAGS, ADD_TAG } from "../queries";
import { Loading } from "../components/Loading";

const options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
};

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

  if (loading) return <Loading message="getting tags..." />;

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
        style={{ margin: "1.2rem" }}
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

      <TagTable tags={result} />
    </Paper>
  );
}

export default Tags;
