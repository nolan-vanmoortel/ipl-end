// @flow weak

// --------------------------------
// CONSTANTS
// --------------------------------
const INCREMENT:            string = "INCREMENT";
const DECREMENT:            string = "DECREMENT";
const DOUBLE_ASYNC:         string = "DOUBLE_ASYNC";

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  value:      0
}

export default function (
  state = initialState,
  action
) {
  switch (action.type){
    case INCREMENT:
      return {
        ...state,
        value:     state.value+1
      }
    case DECREMENT:
      return {
        ...state,
        value:     state.value-1
      }
    case DOUBLE_ASYNC:
      return {
        ...state,
        value:     state.value*2
      }
    default:
      return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
//
export function increment() {
  return {
    type : INCREMENT
  };
}
export function decrement() {
  return {
    type : DECREMENT
  };
}
export function doubleAsync() {
  return (dispatch, getState) => {
    const state = getState();

    return new Promise((resolve)=>{
      setTimeout(() => {
        dispatch({
          type : DOUBLE_ASYNC,
          payload : state.counter
        })
        resolve()
      },200)
    })
  };
}
