// @flow

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as userActions   from '../../redux/modules/user';
import * as counterActions    from '../../redux/modules/counter';
import * as scanActions       from '../../redux/modules/scanQr';
import Protected              from './Protected';


const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,

    firstname:   state.user.firstname,
    lastname:    state.user.lastname,
    value:       state.counter.value,

    delay:        state.scanQr.delay,
    showQr:       state.scanQr.showQr,
    url:          state.scanQr.url,
    scanSuccess:  state.scanQr.scanSuccess,
    message:      state.scanQr.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enterProtected: viewsActions.enterProtected,
      leaveProtected: viewsActions.leaveProtected,
      ...userActions,
      ...counterActions,
      ...scanActions
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Protected);
