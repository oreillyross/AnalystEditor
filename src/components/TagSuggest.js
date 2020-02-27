import React from 'react';
import Autosuggest from 'react-autosuggest'
import { Input } from 'semantic-ui-react'



const tags = [

  {name: 'Google'},
  {name: 'Chrome'},
  {name: 'Chr00ome'},
  {name: 'Chraa00ome'},
  {name: 'Browser'},
  ]


const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length

  return inputLength === 0 ? [] : 
  
  tags.filter(tag => tag.name.toLowerCase().slice(0, inputLength) === inputValue
   ) 
}

const getSuggestionValue = suggestion => suggestion.name

const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
    </div>
)

export default function TagSuggest({addTag}) {
  
  const onSuggestionsFetchRequested = ({value}) => {
    setSuggestions(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }



  const [suggestions, setSuggestions] = React.useState([])
  const [value, setValue] = React.useState('')
  

  const tagSelected = (e) => {
    if (e.keyCode === 13) {
      addTag(value)
      setValue('')
    }
    
  }

  const onChange = (event, {newValue}) => {
    setValue(newValue)
  }



  const inputProps = {
    placeholder: 'add a new tag',
    value,
    onChange,
  }

 

    const renderInputComponent = inputProps => (
    <Input 
     onKeyUp={tagSelected}
    {...inputProps}/>
  );
  
  return (
    <span style={{margin: '.5rem', borderRadius: '15px 15px 15px 15px', padding: '.2rem'}}>
       <Autosuggest
      highlightFirstSuggestion
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
        
      renderInputComponent={renderInputComponent}
     >
     </Autosuggest>
    </span>
  )

}