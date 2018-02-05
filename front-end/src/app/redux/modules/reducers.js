// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import views                from './views';
import userAuth             from './userAuth';
import counter             from './counter';
import machine             from './machine';
import scanQr               from './scanQr';

export const reducers = {
  views,
  userAuth,
  counter,
  machine,
  scanQr
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
