//@flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as machineActions      from '../../redux/modules/machine';

import AdminDashboard from './AdminDashboard';

const mapStateToProps = (state) => {
  return {
    // views
    currentView:  state.views.currentView,

    file:         state.machine.file
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterAdminDashboard: viewsActions.enterHome,
      leaveAdminDashboard: viewsActions.leaveHome,
      ...machineActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
