// @flow weak

// --------------------------------
// CONSTANTS
// --------------------------------
const HANDLE_RESULT:            string = 'HANDLE_RESULT';
const HANDLE_ERROR:             string = 'HANDLE_ERROR';
const SCAN_CLICK:               string = 'SCAN_CLICK';
const REDIRECTED:               string = 'REDIRECTED';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  url: 'Not an url',
  message: ' ',
  delay: 500,
  showQr: false,
  scanSuccess: false
};

export default function (
  state = initialState,
  action
) {
  switch (action.type){
    case REDIRECTED:
      return {
        ...state,
        scanSuccess: false,
        showQr: false
      };
    case HANDLE_RESULT:
      return {
        ...state,
        url:     action.data,
        scanSuccess: action.data!==null,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        message: 'An error as occured !'
      };
    case SCAN_CLICK:
      return {
        ...state,
        showQr: !state.showQr
      };
    default:
      return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

export function handleScan(data: string) {
  return {
    type : HANDLE_RESULT,
    data
  };
}

export function handleError() {
  return {
    type : HANDLE_ERROR
  };
}

export function scanClick() {
  return {
    type : SCAN_CLICK
  };
}

export function redirected() {
  return {
    type : REDIRECTED
  };
}

