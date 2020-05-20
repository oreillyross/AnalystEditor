import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 15px 15px;
  padding: 8px;
  float: right;
`;
const StyledMessage = styled.span`
  float: right;
  marginright: 12px;
`;

const StyledIndicator = styled.div`
  margin: 15px;
`;

function IndicatorItem({ indicator, indicatorState = "unlinked" }) {
  const unlinked = "unlinked";
  const pendingLink = "pendingLink";
  const linked = "linked";
  const pendingUpdate = "pendingUpdate";

  let message, btnText;

  if (indicatorState === unlinked) {
    message = "";
    btnText = "link";
  } else if (indicatorState === pendingLink) {
    message = "link to be added";
    btnText = "unlink";
  } else if (indicatorState === linked) {
    message = "linked";
    btnText = "update";
  } else if (indicatorState === pendingUpdate) {
    message = "link to be updated";
    btnText = "cancel";
  }

  //state   // unlinked| pendingLink      | linked | pendingUpdate
  //message // <empty> | link to be added | linked | link to be updated
  //btnText // link    | unlink           | update | cancel

  const changeState = e => {};

  return (
    <StyledIndicator>
      {indicator.name}
      <StyledMessage>{message}</StyledMessage>
      <StyledButton onClick={changeState}>{btnText}</StyledButton>
    </StyledIndicator>
  );
}

export { IndicatorItem };

/**
 * <empty> - link : state = unlinked ->
 * link to be added - unlink : state = pendingLink
 * linked - update : state = linked ->
 * link to be updated - cancel : state = pendingUpdate
 *
 **/
