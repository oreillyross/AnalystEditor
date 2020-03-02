import React from "react";
import { TextArea } from "semantic-ui-react";
import { TextareaAutosize, makeStyles  } from '@material-ui/core'

const useStyles = makeStyles({
  textarea: {
  width: '100%',
  height: '100%', 
  boxSizing: 'border-box',
  fontSize: '1rem'
  }
})

function getSelectedText() {
  const txtarea = document.getElementById("txtarea");
  const start = txtarea.selectionStart;
  const finish = txtarea.selectionEnd;
  return txtarea.value.substring(start, finish);
}



const TextSelector = ({ article, selectText }) => {
  const classes = useStyles()
  const { text } = article;
  
  return (
   
      <div style={{ textAlign: "left" }}>
        <TextareaAutosize
          id="txtarea"
          onMouseUp={() => selectText(getSelectedText())}
          value={text}
          className={classes.textarea}
        />
       
      </div>
  )
}

export default TextSelector;
