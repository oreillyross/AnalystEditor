import React from 'react'
import Tag from './Tag'
import TagSuggest from './TagSuggest'
import styled from 'styled-components'

const StyledParent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px, 1fr));
`

export default function Tags({initialTags, onDelete, addTag}) {
  

  return (
    <StyledParent>
    {initialTags.map(tag => (
       <Tag key={tag} name={tag} onDelete={onDelete}/>
    ))}
    <TagSuggest addTag={addTag}/>
    </StyledParent>
  )
}