// @flow weak

import { connect }            from 'react-redux';
import {
  bindActionCreators,
  compose
}                             from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import App                    from './App';
import { withRouter }         from 'react-router';


const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...viewsActions
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
