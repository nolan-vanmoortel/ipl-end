/* eslint-disable no-undef */
// @flow weak

import React, {
  PureComponent
}                   from 'react';
import PropTypes    from 'prop-types';

import AnimatedView from '../../components/animatedView/AnimatedView';
import Report from '../../components/report/Report';

import { Form, notification } from 'antd';
import {appConfig} from '../../config';

type Props = {
  match: any,
  location: any,
  history: any,

  currentView: string,
}

type State = {
  email: String
}

class ReportForm extends PureComponent<Props, State> {
  // eslint-disable-next-line no-undef
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    currentView: PropTypes.string.isRequired,
    enterReportForm: PropTypes.func.isRequired,
    leaveReportForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,

    createReport: PropTypes.func.isRequired,

    toggleRequestError: PropTypes.func.isRequired,
    requestError: PropTypes.bool.isRequired,
    toggleRequestSuccess: PropTypes.func.isRequired,
    requestSuccess: PropTypes.bool.isRequired,

    getMachines: PropTypes.func.isRequired,
    updateMachines: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      model: '',
      machine: '',
      loading: false
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { enterReportForm } = this.props;
    this.setState({ machine: this.props.match.params.machineName });
    enterReportForm();
  }

  componentWillUnmount() {
    const { leaveReportForm } = this.props;
    leaveReportForm();
  }

  componentDidUpdate() {
    const { requestError, toggleRequestError,
    requestSuccess, toggleRequestSuccess, history } = this.props;
    if(requestError) {
      this.openErrorNotification('Une erreur est survenue');
      toggleRequestError();
    }
    if(requestSuccess) {
      this.openSuccessNotification('Nous avons bien reçu votre problème');
      toggleRequestSuccess();
      this.getMachines();
      history.push('/');
      this.setState({ loading:false });
    }
  }

  getMachines = async () => {
    const { updateMachines, getMachines } = this.props;
    const response = await getMachines();
    const allMachines = response.payload.data;
    updateMachines(allMachines);
  };

  openErrorNotification = (comment) => {
    notification.error({
      message: comment
    });
  };

  openSuccessNotification = (comment) => {
    notification.success({
      message: comment
    });
  };

  handleModelChange = (model) => {
    this.setState({
      model
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { model } = this.state;
      if(!model) {
        this.openErrorNotification('La description est un peu vide');
      } else if (!err) {
        let type;
        let severity;
        if(!values.type) {
          type = appConfig.MACHINE_TYPES.default;
        } else {
          type = values.type;
        }
        if(!values.severity || values.severity === false) {
          severity = appConfig.MACHINE_SEVERITIES.minor;
        } else {
          severity = appConfig.MACHINE_SEVERITIES.major;
        }
        const report = {
          machine: this.state.machine,
          email: values.email,
          modele: model,
          type : type,
          severity: severity
        };
        const { createReport } = this.props;
        createReport(report);
        this.setState({ loading: true });
      }
    });
  };


  render() {
    const { model, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const config = {
      heightMin: 200,
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
        'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle',
        '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertImage',
        'insertTable', '-', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting',
        '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
      toolbarButtonsXS: ['bold', 'italic', 'fontSize', 'fontStyle', 'insertImage', 'undo', 'redo'],
      quickInsertTags: [''],
      placeholderText: 'Veuilliez entrer une description du problème *'
    };
    return(
      <AnimatedView>
        <Report
          getFieldDecorator={getFieldDecorator}
          handleSubmit={this.handleSubmit}
          handleModelChange={this.handleModelChange}
          model={model}
          config={config}
          loading={loading} />
      </AnimatedView>
    );
  }
}

export default Form.create()(ReportForm);
