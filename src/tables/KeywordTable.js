import React from 'react'
import Tag from "../components/Tag";
import styled from "styled-components";




const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function KeywordTable({keywords}) {
  
  return (
    <div>
          Keywords
         
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
  )
}

export default KeywordTable