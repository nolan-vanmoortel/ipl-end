// @flow weak

import userInfosMockData  from '../../mock/userInfosMock.json';
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
//

export function UploadFile(file){
  return dispatch => {
    const FETCH_TYPE  = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';
    const __SOME_LOGIN_API__ = 'machines';

    const mockResult  = userInfosMockData;
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
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
        // mock !
        mockResult,
        // real
        url,
        method,
        headers,
        options
      }
    });

  }
}

