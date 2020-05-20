import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: ${props => props.btnColor};
  border-radius: 15px 15px;
  float: right;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

function LinkStatus({ status, onClick }) {
  let text = "";
  let btnColor;
  switch (status) {
    case "add":
      text = "add";
      btnColor = "blue";
      break;
    case "toAdd":
      text = "to be added";
      btnColor = "green";
      break;
    case "linked":
      text = "linked";
      btnColor = "grey";
      break;
    case "update":
      text = "link will update";
      btnColor = "yellow";
      break;

    default:
      text = "schism";
      btnColor = "purple";
  }

  return (
    <StyledButton onClick={onClick} btnColor={btnColor} type="button">
      {text}
    </StyledButton>
  );
}

export { LinkStatus };
