// @flow weak

import React,
{ PureComponent }       from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import {Link} from 'react-router-dom';


class Footer extends PureComponent {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  displayFooter = () => {
    const { isAuthenticated } = this.props;
    if(isAuthenticated) {
      return <Link to="/logout">se déconnecter</Link>;
    } else {
      return <Link to="/adminDashboard">zone admin</Link>;
    }
  };

  render() {
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>
        <p>
          Internal Problem Logger ©2018 Created by Maniet, Nguyen, Sacré & Vanmoortel &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
          <span>{this.displayFooter()}</span>
        </p>
      </Layout.Footer>
    );
  }
}

export default Footer;
