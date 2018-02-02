// @flow weak

import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import views                from './views';
import userAuth             from './userAuth';

export const reducers = {
  views,
  userAuth
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
