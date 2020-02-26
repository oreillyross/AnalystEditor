import React from 'react'
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PersonIcon from '@material-ui/icons/Person';

function getIcon(type) {
  switch (type) {
    case 'person': return <PersonIcon/>
    case 'place': return <LocationCityIcon/>
    default: return null
  }
}

export default getIcon