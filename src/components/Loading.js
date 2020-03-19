import React from 'react'
import { BarLoader } from 'react-css-loaders';


function Loading({message = 'Loading content'}) {
  return ( <div>
  <Barloader/>
{message}
</div>
  )
}

export default Loading

