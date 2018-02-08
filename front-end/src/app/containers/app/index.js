// @flow weak

import { connect }            from 'react-redux';
import {
  bindActionCreators,
  compose
}                             from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as machinesActions   from '../../redux/modules/machine';
import * as userActions       from '../../redux/modules/user';

import App                    from './App';
import { withRouter }         from 'react-router';


const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,
    machines: state.machine.machines,
    isAuthenticated: state.user.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...machinesActions,
      ...viewsActions,
      ...userActions
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
