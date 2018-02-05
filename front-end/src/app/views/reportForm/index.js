// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../redux/modules/views';
import ReportForm from './ReportForm';

const mapStateToProps = (state) => {
  return {
    currentView: state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enterReportForm: viewsActions.enterReportForm,
      leaveReportForm: viewsActions.leaveReportForm
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportForm);
