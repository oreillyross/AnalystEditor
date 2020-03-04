import React from 'react'
import { Button, Icon } from 'semantic-ui-react'


function Chip({name}) {
  return (
    <Button
    style={{margin: '.3rem', height:'40px', borderRadius: "20px"}}
    basic
    color='blue'>

{name}

<Icon corner='top right' size='small' name='delete'/>




      </Button>
  )
}

export default Chip