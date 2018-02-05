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
  url: 'Not an url',
  message: 'Scan a QR code !',
  delay: 500,
  showQr: false,
  scanSuccess: false
};

export default function (
  state = initialState,
  action
) {
  switch (action.type){
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
  console.log(data);
  console.log(initialState.url);
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

