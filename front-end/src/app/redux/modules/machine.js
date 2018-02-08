// @flow weak

import getLocationOrigin  from '../../services/utils/getLocationOrigin';
import { appConfig }      from '../../config';
import moment             from 'moment';

// --------------------------------
// CONSTANTS
// --------------------------------

const UPLOAD_REQUEST:                   string = 'UPLOAD_REQUEST';
const UPLOAD_RECEIVED:                  string = 'UPLOAD_RECEIVED';
const UPLOAD_ERROR:                     string = 'UPLOAD_ERROR';

const TOGGLE_UPLOAD_ERROR:              string = 'TOGGLE_UPLOAD_ERROR';
const TOGGLE_UPLOAD_SUCCESS:            string = 'TOGGLE_UPLOAD_SUCCESS';

const GET_ALL_MACHINES:                  string = 'GET_ALL_MACHINES';
const GET_ALL_MACHINES_RECEIVED:             string = 'GET_ALL_MACHINES_RECEIVED';
const GET_ALL_MACHINES_ERROR:                string = 'GET_ALL_MACHINES_ERROR';
const UPDATE_MACHINES:                string = 'UPDATE_MACHINES';

const REQUEST_SET_STATE_MACHINE:  string = 'REQUEST_SET_STATE_MACHINE';
const RECEIVED_SET_STATE_MACHINE: string = 'RECEIVED_SET_STATE_MACHINE';
const ERROR_SET_STATE_MACHINE:    string = 'ERROR_SET_STATE_MACHINE';


// --------------------------------
// REDUCER
// --------------------------------

const initialState = {
  file:           null,
  uploading:      false,
  uploadError:    false,
  uploadSuccess:  false,
  machines:       []
};

export default function (
  state = initialState, action) {

  const currentTime = moment().format();

  switch(action.type) {
  case REQUEST_SET_STATE_MACHINE:
    return {
      ...state,
      actionTime: currentTime
    };
  case RECEIVED_SET_STATE_MACHINE:
    return {
      ...state,
      actionTime: currentTime
    };
  case ERROR_SET_STATE_MACHINE:
    return {
      ...state,
      actionTime: currentTime
    };
  case UPLOAD_REQUEST:
    return {
      ...state,
      file: action.payload,
      uploading: true,
      uploadError: false,
      uploadSuccess:  false
    };
  case UPLOAD_RECEIVED:
    return {
      ...state,
      file: null,
      uploading: false,
      uploadError: false,
      uploadSuccess: true
    };
  case UPLOAD_ERROR:
    return{
      ...state,
      file: null,
      uploading: false,
      uploadError: true,
      uploadSuccess:  false
    };
  case UPDATE_MACHINES:
    return{
      ...state,
      machines: action.machines
    };
  case GET_ALL_MACHINES:
    return{
      ...state
    };
  case GET_ALL_MACHINES_RECEIVED:
    return{
      ...state
    };
  case GET_ALL_MACHINES_ERROR:
    return{
      ...state
    };

    case TOGGLE_UPLOAD_ERROR:
      return {
        ...state,
        uploadError: !state.uploadError
      };
    case TOGGLE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadSuccess: !state.uploadSuccess
      };


  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
export function getMachines() {
  return dispatch => {
    const FETCH_TYPE  = 'FETCH';
    const url         = `${getLocationOrigin()}/${appConfig.API.machines}/allMachines`;
    const method      = 'get';
    const headers     = {};
    const options     = {
      credentials: 'same-origin'
    };

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request:  GET_ALL_MACHINES,
          success:  GET_ALL_MACHINES_RECEIVED,
          fail:     GET_ALL_MACHINES_ERROR
        },
        url,
        method,
        headers,
        options
      }
    });
  };
}

export function setStateMachine(id, state) {
  return dispatch => {
    const FETCH_TYPE = 'FETCH';
    const url = `${getLocationOrigin()}/${appConfig.API.setStateMachine}/${id}/${state}`;
    const method = 'get';
    const headers = {};
    const options = {
      credentials: 'same-origin',
    };
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_SET_STATE_MACHINE,
          success: RECEIVED_SET_STATE_MACHINE,
          fail: ERROR_SET_STATE_MACHINE
        },
        url,
        method,
        headers,
        options
      }
    });
  };
}

export function manual(machine) {
  return dispatch => {
    const FETCH_TYPE  = 'FETCH';
    const url         = `${getLocationOrigin()}/${appConfig.API.machines}/manual`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      credentials: 'same-origin',
      data: {
        name: machine.name,
        ip: machine.ip,
        mac: machine.mac,
        location: machine.location,
        comment: machine.comment
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

export function updateMachines(machines) {
  return {
    type: UPDATE_MACHINES,
    machines
  };
}

export function uploadFile(file) {
  return dispatch => {
    const FETCH_TYPE  = 'FETCH';
    const url         = `${getLocationOrigin()}/${appConfig.API.machines}/import`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      credentials: 'same-origin',
      data: file
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

export function toggleUploadError() {
  return {
    type: TOGGLE_UPLOAD_ERROR
  };
}

export function toggleUploadSuccess() {
  return {
    type: TOGGLE_UPLOAD_SUCCESS
  };
}

