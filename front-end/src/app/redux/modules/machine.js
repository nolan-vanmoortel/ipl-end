// @flow weak

import getLocationOrigin  from '../../services/utils/getLocationOrigin';
import { appConfig }      from '../../config';

// --------------------------------
// CONSTANTS
// --------------------------------

const UPLOAD_REQUEST:                   string = 'UPLOAD_REQUEST';
const UPLOAD_RECEIVED:                  string = 'UPLOAD_RECEIVED';
const UPLOAD_ERROR:                     string = 'UPLOAD_ERROR';
const GET_ALL_MACHINES:                  string = 'GET_ALL_MACHINES';
const ALL_MACHINES_RECEIVED:             string = 'ALL_MACHINES_RECEIVED';
const ALL_MACHINES_ERROR:                string = 'ALL_MACHINES_ERROR';


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
      };
    case UPLOAD_RECEIVED:
      return {
        ...state,
        file: null,
        upload: true
      };
    case UPLOAD_ERROR:
      return{
        ...state,
        file: null,
        upload: false
      };
    case GET_ALL_MACHINES:
      return{
        ...state
      };
    case ALL_MACHINES_RECEIVED:
      return{
        ...state
      };
    case ALL_MACHINES_ERROR:
      return{
        ...state
      };
    default:
      return state;
  }

}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
export function getMachines(){
  return dispatch => {
    const FETCH_TYPE  = 'FETCH';
    const url         = `${getLocationOrigin()}/${appConfig.API.machines}/allMachines`;
    const method      = 'get';
    const headers     = {};
    const options     = {
      credentials: 'same-origin',
    };

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request:  GET_ALL_MACHINES,
          success:  ALL_MACHINES_RECEIVED,
          fail:     ALL_MACHINES_ERROR
        },
        url,
        method,
        headers,
        options
      }
    });
  };
}

export function uploadFile(file){
  return dispatch => {
    const FETCH_TYPE  = 'FETCH';
    const url         = `${getLocationOrigin()}/${appConfig.API.machines}/import`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      credentials: 'same-origin',
      data: {
        file:file
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
  };
}

