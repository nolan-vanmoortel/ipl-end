// @flow weak

import getLocationOrigin  from '../../services/utils/getLocationOrigin';
import { appConfig }      from '../../config';
import moment             from 'moment';
// -----------------------------
// CONSTANTS
// -----------------------------

const REQUEST_CREATE_REPORT:  string = 'REQUEST_CREATE_REPORT';
const RECEIVED_CREATE_REPORT: string = 'RECEIVED_CREATE_REPORT';
const ERROR_CREATE_REPORT:    string = 'ERROR_CREATE_REPORT';

const TOGGLE_REQUEST_ERROR:   string = 'TOGGLE_REQUEST_ERROR';
const TOGGLE_REQUEST_SUCCESS: string = 'TOGGLE_REQUEST_SUCCESS';

const TOGGLE_SET_REPORT_STATE_SUCCESS:           string = 'TOGGLE_SET_REPORT_STATE_SUCCESS';
const TOGGLE_SET_REPORT_STATE_ERROR:             string = 'TOGGLE_SET_REPORT_STATE_ERROR';

const TOGGLE_SET_REPORT_ADMIN_SUCCESS:           string = 'TOGGLE_SET_REPORT_ADMIN_SUCCESS';
const TOGGLE_SET_REPORT_ADMIN_ERROR:             string = 'TOGGLE_SET_REPORT_ADMIN_ERROR';

const REQUEST_SET_STATE_REPORT:  string = 'REQUEST_SET_STATE_REPORT';
const RECEIVED_SET_STATE_REPORT: string = 'RECEIVED_SET_STATE_REPORT';
const ERROR_SET_STATE_REPORT:    string = 'ERROR_SET_STATE_REPORT';

const REQUEST_SET_ADMIN_REPORT:  string = 'REQUEST_SET_ADMIN_REPORT';
const RECEIVED_SET_ADMIN_REPORT: string = 'RECEIVED_SET_ADMIN_REPORT';
const ERROR_SET_ADMIN_REPORT:    string = 'ERROR_SET_ADMIN_REPORT';

// -----------------------------
// REDUCER
// -----------------------------
const initialState = {
  isCreating: false,
  requestError: false,
  requestSuccess: false,

  setReportStateSuccess:false,
  setReportStateError:  false,

  setReportAdminSuccess:false,
  setReportAdminError:  false
};

export default function (
  state=initialState,
  action
) {
  const currentTime = moment().format();

  switch(action.type) {
  case REQUEST_SET_STATE_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      setReportStateSuccess:false,
      setReportStateError:  false
    };
  case RECEIVED_SET_STATE_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      setReportStateSuccess: true,
      setReportStateError:  false
    };
  case ERROR_SET_STATE_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      setReportStateSuccess:false,
      setReportStateError:  true
    };
  case REQUEST_SET_ADMIN_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      setReportAdminSuccess:false,
      setReportAdminError:  false
    };
  case RECEIVED_SET_ADMIN_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      setReportAdminSuccess: true,
      setReportAdminError:  false
    };
  case ERROR_SET_ADMIN_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      setReportAdminSuccess: false,
      setReportAdminError:  true
    };
  case REQUEST_CREATE_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      isCreating: true,
      requestError: false,
      requestSuccess: false
    };
  case RECEIVED_CREATE_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      isCreating: false,
      requestError: false,
      requestSuccess: true
    };
  case ERROR_CREATE_REPORT:
    return {
      ...state,
      actionTime: currentTime,
      isCreating: false,
      requestError: true,
      requestSuccess: false
    };
  case TOGGLE_REQUEST_ERROR:
    return {
      ...state,
      requestError: !state.requestError
    };
  case TOGGLE_REQUEST_SUCCESS:
    return {
      ...state,
      requestSuccess: !state.requestSuccess
    };
  case TOGGLE_SET_REPORT_ADMIN_SUCCESS:
    return {
      ...state,
      setReportAdminSuccess: !state.setReportAdminSuccess
    };
  case TOGGLE_SET_REPORT_ADMIN_ERROR:
    return {
      ...state,
      setReportAdminError: !state.setReportAdminError
    };
  case TOGGLE_SET_REPORT_STATE_SUCCESS:
    return {
      ...state,
      setReportStateSuccess: !state.setReportStateSuccess
    };
  case TOGGLE_SET_REPORT_STATE_ERROR:
    return {
      ...state,
      setReportStateError: !state.setReportStateError
    };
  default:
    return state;
  }
}

// -------------------------------
// ACTION CREATORS
// -------------------------------

export function createReport(report) {
  return dispatch => {
    const FETCH_TYPE = 'FETCH';
    const url = `${getLocationOrigin()}/${appConfig.API.reports}/create`;
    const method = 'post';
    const headers = {};
    const options = {
      credentials: 'same-origin',
      data: {
        email: report.email,
        machine: report.machine,
        modele: report.modele,
        severity: report.severity,
        type: report.type
      }
    };
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_CREATE_REPORT,
          success: RECEIVED_CREATE_REPORT,
          fail: ERROR_CREATE_REPORT
        },
        url,
        method,
        headers,
        options
      }
    });
  };
}
export function setStateReport(id, date, state) {
  return dispatch => {
    const FETCH_TYPE = 'FETCH';
    const url = `${getLocationOrigin()}/${appConfig.API.setState}/${id}/${date}/${state}`;
    const method = 'get';
    const headers = {};
    const options = {
      credentials: 'same-origin'
    };
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_SET_STATE_REPORT,
          success: RECEIVED_SET_STATE_REPORT,
          fail: ERROR_SET_STATE_REPORT
        },
        url,
        method,
        headers,
        options
      }
    });
  };
}
export function setAdminReport(id, date, admin) {
  return dispatch => {
    const FETCH_TYPE = 'FETCH';
    const url = `${getLocationOrigin()}/${appConfig.API.setAdmin}/${id}/${date}/${admin}`;
    const method = 'get';
    const headers = {};
    const options = {
      credentials: 'same-origin'
    };
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_SET_ADMIN_REPORT,
          success: RECEIVED_SET_ADMIN_REPORT,
          fail: ERROR_SET_ADMIN_REPORT
        },
        url,
        method,
        headers,
        options
      }
    });
  };
}

export function toggleRequestError() {
  return {
    type: TOGGLE_REQUEST_ERROR
  };
}

export function toggleRequestSuccess() {
  return {
    type: TOGGLE_REQUEST_SUCCESS
  };
}

export function toggleSetReportStateSuccess() {
  return {
    type: TOGGLE_SET_REPORT_STATE_SUCCESS
  };
}

export function toggleSetReportStateError() {
  return {
    type: TOGGLE_SET_REPORT_STATE_ERROR
  };
}

export function toggleSetReportAdminSuccess() {
  return {
    type: TOGGLE_SET_REPORT_ADMIN_SUCCESS
  };
}

export function toggleSetReportAdminError() {
  return {
    type: TOGGLE_SET_REPORT_ADMIN_ERROR
  };
}
