import React, { useContext } from "react";
import styled from "styled-components";
import {
  CountStateContext,
  CountDispatchContext,
} from "./context/CountProvider";

const Count = () => {
  const countState = useContext(CountStateContext);
  const countDispatch = useContext(CountDispatchContext);

  return (
    <CountWrapper>
      {countState?.valueNum}
      <button onClick={() => countDispatch!({ type: "PLUS" })}>+</button>
      <button onClick={() => countDispatch!({ type: "MINUS" })}>
        -
      </button>
      <button onClick={() => countDispatch!({ type: "SET_DEFAULT" })}>
        초기화
      </button>
    </CountWrapper>
  );
};

export default Count;

const CountWrapper = styled.div``;
