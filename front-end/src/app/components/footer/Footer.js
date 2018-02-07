// @flow weak

import React,
{ PureComponent }       from 'react';
import { Layout } from 'antd';
import {Link} from "react-router-dom";


class Footer extends PureComponent {

  render() {
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>
        <p>
          Internal Problem Logger ©2018 Created by Maniet, Nguyen, Sacré & Vanmoortel &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
          <span><Link to="/adminDashboard">zone admin</Link></span>
        </p>
      </Layout.Footer>
    );
  }
}

export default Footer;
