// @flow

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as userAuthActions   from '../../redux/modules/userAuth';
import * as counterActions   from '../../redux/modules/counter';
import Protected              from './Protected';


const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,

    firstname:   state.userAuth.firstname,
    lastname:    state.userAuth.lastname,
    value:       state.counter.value
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enterProtected: viewsActions.enterProtected,
      leaveProtected: viewsActions.leaveProtected,
      ...userAuthActions,
      ...counterActions
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Protected);
