// @flow weak

import React, {
  PureComponent
}                   from 'react';
import PropTypes    from 'prop-types';
import AnimatedView from '../../components/animatedView/AnimatedView';
import Report from '../../components/report/Report';
import { Form } from 'antd';

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

    createReport: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      model: '',
      machine: '',
      formError: false
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

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
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
        this.setState({ formError: true });
      } else if (!err) {
        const report = {
          machine: this.state.machine,
          email: values.email,
          modele: model
        };
        const { createReport } = this.props;
        createReport(report);
      }
    });
  };


  render() {
    const { model, formError } = this.state;
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
          formError={formError}/>
      </AnimatedView>
    );
  }
}

export default Form.create()(ReportForm);
