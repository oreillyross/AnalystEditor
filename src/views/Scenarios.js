import React from "react";
import { GET_SCENARIOS } from "../queries";
import ScenarioTable from '../tables/ScenarioTable'
import { useQuery} from '@apollo/react-hooks'

function Scenarios() {
  
  const {data} = useQuery(GET_SCENARIOS)
  if (data) console.log(data)
  return <div>Scenarios</div>;


}

export default Scenarios;
