// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as viewsActions from '../../redux/modules/views';
import * as reportActions from '../../redux/modules/report';
import ReportForm from './ReportForm';

const mapStateToProps = (state) => {
  return {
    currentView: state.views.currentView,
    requestError: state.report.requestError
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enterReportForm: viewsActions.enterReportForm,
      leaveReportForm: viewsActions.leaveReportForm,
      createReport: reportActions.createReport,
      toggleRequestError: reportActions.toggleRequestError
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportForm);
