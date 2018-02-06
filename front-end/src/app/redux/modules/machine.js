// @flow weak

import getLocationOrigin  from '../../services/utils/getLocationOrigin';
import { appConfig }      from '../../config';

// --------------------------------
// CONSTANTS
// --------------------------------

const UPLOAD_REQUEST:                   string = 'UPLOAD_REQUEST';
const UPLOAD_RECEIVED:                  string = 'UPLOAD_RECEIVED';
const UPLOAD_ERROR:                     string = 'UPLOAD_ERROR';


// --------------------------------
// REDUCER
// --------------------------------

const initialState = {
  file:           null,
  upload:         false
};

export default function (
  state = initialState, action) {
  switch(action.type){
    case UPLOAD_REQUEST:
      return {
        ...state,
        file: action.payload,
        upload: false
      }
    case UPLOAD_RECEIVED:
      return {
        ...state,
        file: null,
        upload: true
      }
    case UPLOAD_ERROR:
      return{
        ...state,
        file: null,
        upload: false
      }
    default:
      return state;
  }

}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------

export function uploadFile(file){
  return dispatch => {
    const FETCH_TYPE  = 'FETCH';
    const url         = `${getLocationOrigin()}/${appConfig.API.machines}/import`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      credentials: 'same-origin',
      data: {
        file
      }
    };

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request:  UPLOAD_REQUEST,
          success:  UPLOAD_RECEIVED,
          fail:     UPLOAD_ERROR
        },
        url,
        method,
        headers,
        options
      }
    });

  }
}

