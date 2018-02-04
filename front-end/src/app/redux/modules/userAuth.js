// @flow weak

import moment             from 'moment';
import { appConfig }      from '../../config';
import userInfosMockData  from '../../mock/userInfosMock.json';
import getLocationOrigin  from '../../services/utils/getLocationOrigin';
import auth               from '../../services/auth';

// --------------------------------
// CONSTANTS
// --------------------------------
const REQUEST_USER_INFOS_DATA:         string = 'REQUEST_USER_INFOS_DATA';
const RECEIVED_USER_INFOS_DATA:        string = 'RECEIVED_USER_INFOS_DATA';
const ERROR_USER_INFOS_DATA:           string = 'ERROR_USER_INFOS_DATA';

const REQUEST_LOG_USER:                string = 'REQUEST_LOG_USER';
const RECEIVED_LOG_USER:               string = 'RECEIVED_LOG_USER';
const ERROR_LOG_USER:                  string = 'ERROR_LOG_USER';

const CHECK_IF_USER_IS_AUTHENTICATED = 'CHECK_IF_USER_IS_AUTHENTICATED';

const DISCONNECT_USER                = 'DISCONNECT_USER';

// --------------------------------
// REDUCER
// --------------------------------
const initialState = {
  isFetching:      false,
  isLogging:       false,
  time:            '',

  id:              '',
  login:           '',
  firstname:       '',
  lastname:        '',

  token:           null,
  isAuthenticated: false
};

export default function (
  state = initialState,
  action
) {
  const currentTime = moment().format();

  switch (action.type) {

  case CHECK_IF_USER_IS_AUTHENTICATED:
    return {
      ...state,
      actionTime:      currentTime,
      isAuthenticated: action.isAuthenticated,
      token:           action.token,
      id:              action.id,
      login:           action.login,
      firstname:       action.firstname,
      lastname:        action.lastname
    };

  case DISCONNECT_USER:
    return {
      ...state,
      actionTime:      currentTime,
      isAuthenticated: false,
      token:           initialState.token,
      id:              initialState.id,
      login:           initialState.login,
      firstname:       initialState.firstname,
      lastname:        initialState.lastname
    };

  case REQUEST_LOG_USER:
    return {
      ...state,
      actionTime: currentTime,
      isLogging:  true
    };

  case RECEIVED_LOG_USER:
    const userLogged = action.payload.data;

    return {
      ...state,
      actionTime:      currentTime,
      isAuthenticated: true,
      token:           userLogged.token,
      id:              userLogged.id,
      login:           userLogged.login,
      firstname:       userLogged.firstname,
      lastname:        userLogged.lastname,
      isLogging:       false
    };

  case ERROR_LOG_USER:
    return {
      ...state,
      actionTime:       currentTime,
      isAuthenticated:  false,
      isLogging:        false
    };

  case REQUEST_USER_INFOS_DATA:
    return {
      ...state,
      actionTime:   currentTime,
      isFetching:   true
    };

  case RECEIVED_USER_INFOS_DATA:
    const userInfos = action.payload.data;

    return {
      ...state,
      actionTime: currentTime,
      isFetching: false,
      id:         userInfos.id,
      login:      userInfos.login,
      firstname:  userInfos.firstname,
      lastname:   userInfos.lastname
    };

  case ERROR_USER_INFOS_DATA:
    return {
      ...state,
      actionTime:   currentTime,
      isFetching:   false
    };

  default:
    return state;
  }
}

// --------------------------------
// ACTIONS CREATORS
// --------------------------------
//

export function disconnectUser() {
  auth.clearAllAppStorage();
  return { type: DISCONNECT_USER };
}

export function checkUserIsConnected() {
  const token           = auth.getToken();
  const user            = auth.getUserInfo();
  const checkUserHasId  = obj => obj && obj._id;
  const isAuthenticated = (token && checkUserHasId(user)) ? true : false;
  return {
    type: CHECK_IF_USER_IS_AUTHENTICATED,
    token,
    ...user,
    isAuthenticated
  };
}

function logUser(
  login: string,
  password: string
) {
  return async (dispatch) => {
    const FETCH_TYPE  = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';
    const __SOME_LOGIN_API__ = 'login';

    const mockResult  = userInfosMockData; // Mock par default sinon vient du serveur
    const url         = `${getLocationOrigin()}/${__SOME_LOGIN_API__}`;
    const method      = 'post';
    const headers     = {};
    const options     = {
      credentials: 'same-origin',
      data: {
        login,
        password
      }
    };

    // fetchMiddleware gère tout seul le principe de mock/real, il dispatch tout seul les 3 action(REQUEST, RECEIVED et ERROR)
    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_LOG_USER,
          success:  RECEIVED_LOG_USER,
          fail:     ERROR_LOG_USER
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
  };
}
export function logUserIfNeeded(
  email: string,
  password: string
): (...any) => Promise<any> {
  return (
    dispatch: (any) => any,
    getState: () => boolean
  ): any => {
    if (shouldLogUser(getState())) {
      return dispatch(logUser(email, password));
    }
    return Promise.resolve();
  };
}
function shouldLogUser(
  state: any
): boolean {
  const isLogging = state.userAuth.isLogging;
  if (isLogging) {
    return false;
  }
  return true;
}

function fetchUserInfosData(id = '') {
  return dispatch => {
    const token = auth.getToken();
    const FETCH_TYPE  = appConfig.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';

    const mockResult  = userInfosMockData;
    const url         = `${getLocationOrigin()}/${appConfig.API.users}/${id}`;
    const method      = 'get';
    const headers     = { authorization: `Bearer ${token}` };
    const options     = { credentials: 'same-origin' };

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: FETCH_TYPE,
        actionTypes: {
          request:  REQUEST_USER_INFOS_DATA,
          success:  RECEIVED_USER_INFOS_DATA,
          fail:     ERROR_USER_INFOS_DATA
        },
        // mock
        mockResult,
        // real
        url,
        method,
        headers,
        options
      }
    });
  };
}

export function fetchUserInfoDataIfNeeded(
  id: string = ''
) {
  return (
    dispatch,
    getState
  ) => {
    if (shouldFetchUserInfoData(getState())) {
      return dispatch(fetchUserInfosData(id));
    }
    return Promise.resolve();
  };
}

function shouldFetchUserInfoData(state): boolean {
  const userInfos = state.userAuth;
  if (userInfos.isFetching) {
    return false;
  }
  return true;
}

