// @flow weak

// --------------------------------
// CONSTANTS
// --------------------------------
const HANDLE_RESULT:            string = 'HANDLE_RESULT';
const HANDLE_ERROR:             string = 'HANDLE_ERROR';
const SCAN_CLICK:               string = 'SCAN_CLICK';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  url: 'localhost:3001',
  message: 'Scan a QR code !',
  delay: 300,
  showQr: false
};

export default function (
  state = initialState,
  action
) {
  switch (action.type){
    case HANDLE_RESULT:
      return {
        ...state,
        url:     action.url
      };
    case HANDLE_ERROR:
      return {
        ...state,
        message: 'An error as occured !'
      };
    case SCAN_CLICK:
      return {
        ...state,
        showQr: true
      };
    default:
      return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

export function handleScan(url: string) {
  return {
    type : HANDLE_RESULT,
    url
  };
}

export function handleError() {
  return {
    type : HANDLE_ERROR,
  };
}

export function scanClick(clicked: boolean) {
  return {
    type : SCAN_CLICK,
    clicked
  };
}

