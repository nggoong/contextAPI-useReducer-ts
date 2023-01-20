import React from "react";
import styled from "styled-components";
import { useCountDispatch, useCountState } from "./context/CountProvider";

const Count = () => {
  const countState = useCountState();
  const countDispatch = useCountDispatch();

  return (
    <CountWrapper>
      {countState.valueNum}
      <button onClick={() => countDispatch({ type: "PLUS" })}>+</button>
      <button onClick={() => countDispatch({ type: "MINUS" })}>-</button>
      <button onClick={() => countDispatch({ type: "SET_DEFAULT" })}>
        초기화
      </button>
    </CountWrapper>
  );
};

export default Count;

const CountWrapper = styled.div``;
