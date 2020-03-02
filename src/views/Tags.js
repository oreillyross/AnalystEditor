import React from 'react'
import Tagtable from '../tables/TagTable'
import TagForm from '../forms/TagForm'
import SearchTagBar from '../components/SearchTagBar'
import { Paper } from '@material-ui/core'
import { StyledHeader } from '../styles/common'

function Tags() {
  return (
    <Paper elevation={2}>
      <StyledHeader>Tags </StyledHeader>
     <SearchTagBar/>
     <Tagtable />
      </Paper>
  )
}

export default Tags