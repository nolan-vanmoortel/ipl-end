// @flow weak

import axios  from 'axios';

export const FETCH_MOCK = 'FETCH_MOCK';
export const FETCH      = 'FETCH';

const fetchMiddleware = store => next => action => {
  if (!action.fetch) {
    return next(action);
  }

  if (!action.fetch.type ||
      !action.fetch.type === FETCH_MOCK ||
      !action.fetch.type === FETCH) {
    return next(action);
  }

  if (!action.fetch.actionTypes) {
    return next(action);
  }

  // MOCK fetch
  if (action.fetch.type === FETCH_MOCK) {
    if (!action.fetch.mockResult) {
      throw new Error('Fetch middleware a besoin de mockResult quand on veux mock');
    }

    const {
      actionTypes: {request, success},
      mockResult
    } = action.fetch;

    // request
    store.dispatch({ type: request });

    // received
    return Promise.resolve(
      store.dispatch({
        type:     success,
        payload:  {
          status: 200,
          data: mockResult
        }
      })
    );
  }

  if (action.fetch.type === FETCH) {
    const {
      actionTypes: {request, success, fail},
      url,
      method,
      headers,
      options
    } = action.fetch;

    // request
    store.dispatch({ type: request });

    // fetch server
    // returns a Promise
    return axios.request({
      method,
      url,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Acces-Control-Allow-Origin': '*',
        ...headers
      },
      ...options
    })
      .then(data => store.dispatch({type: success, payload: data}))
      .catch(
        err => {
          store.dispatch({type: fail, error: err.response});
          return Promise.reject(err.response);
        }
      );
  }
  return next(action);
};

export default fetchMiddleware;
