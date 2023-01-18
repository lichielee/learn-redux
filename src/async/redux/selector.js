import {stateKey} from "./reducerSlice";

export function getStateSlice(state){
  return state[stateKey];
}

export function getValue(state) {
  const stateSlice = getStateSlice(state);
  return stateSlice.value;
}