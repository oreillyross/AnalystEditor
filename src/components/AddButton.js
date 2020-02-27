import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styled from "styled-components";

const StyledDiv = styled.div`
  :hover {
    filter: brightness(50%);
    cursor: pointer;
  }
  border: none;
`;

function AddButton({onClick}) {
  return (
    <StyledDiv>
      <AddCircleOutlineIcon
        onClick={onClick}
      />
    </StyledDiv>
  );
}

export default AddButton;
