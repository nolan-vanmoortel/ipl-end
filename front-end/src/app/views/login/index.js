// @flow weak

import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../redux/modules/views';
import * as userActions   from '../../redux/modules/user';
import Login                  from './Login';

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,

    isAuthenticated: state.user.isAuthenticated,
    isFetching:      state.user.isFetching,
    isLogging:       state.user.isLogging

  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      ...viewsActions,
      ...userActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
