import React from "react";
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import EventTable from '../tables/EventTable'


function Event() {
  return <Paper>Event view
    <div>
      <EventTable/>
    </div>
  </Paper>;
}

export default Event;
