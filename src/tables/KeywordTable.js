import React from 'react'
import Tag from "../components/Tag";
import { StyledTags } from '../styles/common'

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