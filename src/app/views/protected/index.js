// @flow

import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as userAuthActions   from '../../redux/modules/userAuth';
import Protected              from './Protected';


const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView,

    firstname:   state.userAuth.firstname,
    lastname:    state.userAuth.lastname
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enterProtected: viewsActions.enterProtected,
      leaveProtected: viewsActions.leaveProtected,
      ...userAuthActions
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Protected);
