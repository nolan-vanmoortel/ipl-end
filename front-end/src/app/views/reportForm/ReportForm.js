// @flow weak

import React, {
  PureComponent
}                   from 'react';
import PropTypes    from 'prop-types';
import AnimatedView from '../../components/animatedView/AnimatedView';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

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
    leaveReportForm: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.state = {
      email: '',
      model: ''
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { enterReportForm } = this.props;
    enterReportForm();
  }

  componentWillUnmount() {
    const { leaveReportForm } = this.props;
    leaveReportForm();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleModelChange(model) {
    this.setState({
      model
    });
  }

  render() {
    const { email, model } = this.state;
    return(
      <AnimatedView>
        <form>
          <FormGroup controlId="report_form">
            <ControlLabel>Email : </ControlLabel>
            <FormControl
              type="email"
              value={email}
              placeholder="example@email.com"
              onChange={this.handleEmailChange}/>
            <HelpBlock>Simplement votre magnifique adresse mail</HelpBlock>
          </FormGroup>
        </form>
        <FroalaEditor
          tag="textarea"
          model={model}
          onModelChange={this.handleModelChange}
        />
      </AnimatedView>
    );
  }
}

export default ReportForm;
