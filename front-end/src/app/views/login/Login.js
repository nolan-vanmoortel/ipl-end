// @flow

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import auth           from '../../services/auth';
import { Form, Icon, Input, Button } from 'antd';


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

type State = {
  email: string,
  password: string
}

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
    logUserIfNeeded: PropTypes.func.isRequired
  };

  static defaultProps = {
    isFetching:      false,
    isLogging:       false
  }

  state = {
    email:          '',
    password:       ''
  };


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

  render() {
    const {
      email,
      password
    } = this.state;

    const {
      isLogging
    } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
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
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }

  handlesOnEmailChange = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
      this.setState({ email: event.target.value.trim() });
    }
  }

  handlesOnPasswordChange = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
      this.setState({ password: event.target.value.trim() });
    }
  }

  handlesOnLogin = async (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      history,
      logUserIfNeeded
    } = this.props;

    const {
      email,
      password
    } = this.state;

    const userLogin = {
      login:    email,
      password: password
    };

    try {
      const response = await logUserIfNeeded(userLogin);
      const {
        data: {
          token,
          user
        }
      } = response.payload;

      auth.setToken(token);
      auth.setUserInfo(user);

      history.push({ pathname: '/' }); // back to Home
    } catch (error) {
      /* eslint-disable no-console */
      console.log('login wrong..., error: ', error);
      /* eslint-enable no-console */
    }
  }

  goHome = (
    event: SyntheticEvent<>
  ) => {
    if (event) {
      event.preventDefault();
    }

    const {
      history
    } = this.props;

    history.push({ pathname: '/' });
  }
}

export default Login;
