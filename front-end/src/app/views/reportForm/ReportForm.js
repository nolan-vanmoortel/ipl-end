// @flow weak

import React, {
  PureComponent
}                   from 'react';
import PropTypes    from 'prop-types';
import AnimatedView from '../../components/animatedView/AnimatedView';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;

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
    leaveReportForm: PropTypes.func.isRequired,
    getFieldDecorator: PropTypes.func
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { email, model } = this.state;
    const { getFieldDecorator } = this.props.form;
    const config = {
      toolbarButtonsXS: ['bold', 'italic', 'fontSize', 'fontStyle', 'insertImage', 'undo', 'redo']
    };
    return(
      <AnimatedView>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'E-mail non-valide!',
              }, {
                required: true, message: 'Veuillez entrer votre e-mail !',
              }]
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail" />
            )}
          </FormItem>
        <FroalaEditor
          tag="textarea"
          model={model}
          onModelChange={this.handleModelChange}
          config={config}/>
          <Button type="primary" htmlType="submit" className="login-form-button" style={{marginTop:10}}>
            Envoyer
          </Button>
        </Form>
      </AnimatedView>
    );
  }
}

export default Form.create()(ReportForm);
