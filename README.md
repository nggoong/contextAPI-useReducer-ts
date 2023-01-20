# Typescript에서 context API 멋지게 사용하기👍

### 1. useReducer를 사용하여 state context와 dispatch context를 따로 생성하고 제공

#### 📌 CountProvider.tsx
```tsx
import React, {
  useReducer,
  createContext,
  Dispatch,
  PropsWithChildren,
} from "react";

export interface TypeCountState {
  valueNum: number;
}

type Action = { type: "SET_DEFAULT" } | { type: "PLUS" } | { type: "MINUS" };
type TypeCountDispatch = Dispatch<Action>;

export const CountStateContext = createContext<TypeCountState | undefined>(undefined);

export const CountDispatchContext = createContext<TypeCountDispatch | undefined>(
  undefined
);

export const countReducer = (state: TypeCountState, action: Action) => {
  switch (action.type) {
    case "SET_DEFAULT": {
      return { ...state, valueNum: 0 };
    }
    case "PLUS": {
      return { ...state, valueNum: state.valueNum + 1 };
    }
    case "MINUS": {
      if (state.valueNum) return { ...state, valueNum: state.valueNum - 1 };
      else return { ...state, valueNum: 0 };
    }
    default: {
      return state;
    }
  }
};

const CountProvider = ({ children }: PropsWithChildren) => {
  const [count, dispatch] = useReducer(countReducer, { valueNum: 0 });

  return (
    <CountDispatchContext.Provider value={dispatch}>
      <CountStateContext.Provider value={count}>
        {children}
      </CountStateContext.Provider>
    </CountDispatchContext.Provider>
  );
};

export default CountProvider;
```

#### 📌 Count.tsx

```tsx
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

```
#### 📌 문제점
CountProvider.tsx에서 Context의 타입은 undefined가 포함된 유니온 타입.
따라서 Count.tsx에서 생성된 Context를 사용할 때, 타입을 검사해주거나 옵셔널을 사용해야한다.
또는 !를 이용하여 null이나 undefined가 아님을 알려주어야 한다.

## 2. 커스텀 훅 정의 및 적용

#### 📌 CountProvider.tsx

```tsx
(...생략)
export const useCountState = () => {
  const countState = useContext(CountStateContext);
  if (!countState) throw new Error("CountProvider not found!");
  return countState;
};

export const useCountDispatch = () => {
  const countDispatch = useContext(CountDispatchContext);
  if (!countDispatch) throw new Error("CountProvider not found!");
  return countDispatch;
};
```
context가 undefined라면 에러를 throw하여 context의 타입이 falsy하지 않음을 미리 증명한다.

#### 📌 Count.tsx

```tsx
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
```
정의한 커스텀 훅을 사용하여 기능을 구현
