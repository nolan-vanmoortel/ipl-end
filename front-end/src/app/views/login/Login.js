// @flow

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import auth           from '../../services/auth';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;


type Props = {
  match: any,
  location: any,
  history: any,

  currentView: string,
  enterLogin: () => void,
  leaveLogin: () => void,

  isAuthenticated: boolean,
  isFetching: boolean,
  isLogging: boolean,
  disconnectUser: () => any,
  logUserIfNeeded: () => any
};

class Login extends PureComponent<Props, State> {

  static propTypes= {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView: PropTypes.string.isRequired,
    enterLogin:  PropTypes.func.isRequired,
    leaveLogin:  PropTypes.func.isRequired,

    isAuthenticated: PropTypes.bool,
    isFetching:      PropTypes.bool,
    isLogging:       PropTypes.bool,
    disconnectUser:  PropTypes.func.isRequired,
    logUserIfNeeded: PropTypes.func.isRequired,

    getFieldDecorator: PropTypes.func,
    getFieldsError: PropTypes.func,
    isFieldTouched: PropTypes.func,
    getFieldError: PropTypes.func

  };

  static defaultProps = {
    isFetching:      false,
    isLogging:       false
  }

  componentDidMount() {
    const {
      enterLogin,
      disconnectUser
    } = this.props;

    disconnectUser();
    enterLogin();
  }

  componentWillUnmount() {
    const { leaveLogin } = this.props;
    leaveLogin();
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  render() {

// eslint-disable-next-line react/prop-types
    const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
    const passwordError = isFieldTouched('password') && getFieldError('password');

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('login', {
            rules: [{
              type: 'email', message: 'E-mail non-valide!',
            }, {
              required: true, message: 'Veuillez entrer votre e-mail !',
            }]
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="E-Mail" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      history,
      logUserIfNeeded
    } = this.props;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        try {
          const response = await logUserIfNeeded(values);
          const {
            data: {
              token,
              user
            }
          } = response.payload;

          auth.setToken(token);
          auth.setUserInfo(user);

          history.push({pathname: '/'}); // back to Home
        } catch (error) {
          /* eslint-disable no-console */
          console.log('login wrong..., error: ', error);
          /* eslint-enable no-console */
        }
      }
    });
  }
}

export default Form.create()(Login);
