import React, {
  useReducer,
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
} from "react";

export interface TypeCountState {
  valueNum: number;
}

type Action = { type: "SET_DEFAULT" } | { type: "PLUS" } | { type: "MINUS" };
type TypeCountDispatch = Dispatch<Action>;

export const CountStateContext = createContext<TypeCountState | undefined>(
  undefined
);

export const CountDispatchContext = createContext<
  TypeCountDispatch | undefined
>(undefined);

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

export default CountProvider;
