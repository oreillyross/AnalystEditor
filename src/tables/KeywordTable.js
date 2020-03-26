import React from "react";
import Tag from "../components/Tag";
import { StyledTags } from "../styles/common";
import { DELETE_KEYWORD, GET_KEYWORDS } from "../queries";
import { useMutation } from "@apollo/react-hooks";

function KeywordTable({ keywords }) {
  const [deleteKeyword] = useMutation(DELETE_KEYWORD);

  function deleteTag(id, event) {
    deleteKeyword({
      variables: { id },
      update(cache, { data }) {
        console.log(data);
        const getExistingKeywords = cache.readQuery({ query: GET_KEYWORDS });
        const existingKeywords = getExistingKeywords
          ? getExistingKeywords.Keywords
          : [];
        const deletedKeyword = data.delete_Keywords
          ? data.delete_Keywords.returning[0]
          : {};
        cache.writeQuery({
          query: GET_KEYWORDS,
          data: {
            Keywords: existingKeywords.filter(
              keyword => keyword.id !== deletedKeyword.id
            )
          }
        });
      }
    });
  }

  return (
    <div>
      <StyledTags>
        {keywords.map(keyword => (
          <Tag
            key={keyword.id}
            name={keyword.name}
            type={keyword.typeKeyword}
            deleteTag={() =>
              window.confirm("Are you sure you want to delete this tag") &&
              deleteTag(keyword.id)
            }
          />
        ))}
      </StyledTags>
    </div>
  );
}

export default KeywordTable;
