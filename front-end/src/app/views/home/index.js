// @flow weak

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as scanActions       from '../../redux/modules/scanQr';
import * as machineAction          from '../../redux/modules/machine';
import Home                   from './Home';


const mapStateToProps = (state) => {
  return {
    // views
    currentView:  state.views.currentView,

    delay:        state.scanQr.delay,
    showQr:       state.scanQr.showQr,
    url:          state.scanQr.url,
    scanSuccess:  state.scanQr.scanSuccess,
    message:      state.scanQr.message,
    file:         state.machine.file
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views
      enterHome: viewsActions.enterHome,
      leaveHome: viewsActions.leaveHome,
      redirected: scanActions.redirected,

      ...scanActions,
      ...machineAction
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
