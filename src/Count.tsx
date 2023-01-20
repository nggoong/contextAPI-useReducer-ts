import React, { useState } from "react";
import styled from "styled-components";

const Count = () => {
  const [value, setValue] = useState(0);
  return (
    <CountWrapper>
      {value}
      <button onClick={() => setValue((prev) => prev + 1)}>+</button>
      <button onClick={() => setValue((prev) => prev - 1)}>-</button>
    </CountWrapper>
  );
};

export default Count;

const CountWrapper = styled.div``;
