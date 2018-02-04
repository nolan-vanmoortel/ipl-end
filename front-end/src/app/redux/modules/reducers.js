// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import views                from './views';
import userAuth             from './userAuth';
import counter             from './counter';

export const reducers = {
  views,
  userAuth,
  counter
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
