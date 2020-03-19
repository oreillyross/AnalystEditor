import React from "react";
import Keywordtable from "../tables/KeywordTable";
import { Paper } from "@material-ui/core";
import { StyledHeader } from "../styles/common";
import { GET_KEYWORDS, ADD_KEYWORD } from "../queries";
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

function Keywords() {
  const { data, loading } = useQuery(GET_KEYWORDS);
  const [value, setValue] = React.useState("");
  const [keywords, setKeywords] = React.useState([]);
  const { result, search, reset } = useFuse({ data: keywords, options });
  const [addKeyword] = useMutation(ADD_KEYWORD);
  React.useEffect(() => {
    if (data) {
      setKeywords(data.Keywords);
    }
  }, [data]);

  if (loading) return null;

  function onChange(e) {
    setValue(e.target.value);
    search(e.target.value);
  }

  const onAddKeyword = () => {
    if (value !== "") {
      addKeyword({
        variables: { name: value },
        update(cache, { data }) {
          const getExistingKeywords = cache.readQuery({ query: GET_KEYWORDS });
          const existingKeywords = getExistingKeywords
            ? getExistingKeywords.Keywords
            : [];
          const newKeyword = data.insert_Keywords
            ? data.insert_Keywords.returning[0]
            : {};
          cache.writeQuery({
            query: GET_KEYWORDS,
            data: { Keywords: [newKeyword, ...existingKeywords] }
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
      <StyledHeader>Keywords </StyledHeader>

      <Input
        style={{ margin: "1.2rem" }}
        autoComplete="off"
        icon="tags"
        iconPosition="left"
        labelPosition="right"
        name="keywordName"
        fluid
        placeholder="search for a keyword here..."
        type="text"
        value={value}
        onChange={onChange}
      />
      {result.length === 0 ? (
        <Button fluid basic color="blue" onClick={onAddKeyword}>
          Add New Keyword
        </Button>
      ) : null}

      <Keywordtable keywords={result} />
    </Paper>
  );
}

export default Keywords;
