// @flow weak

import React,
{ PureComponent }       from 'react';
import { Layout } from 'antd';


class Footer extends PureComponent {

  render() {
    return (
      <Layout.Footer style={{ textAlign: 'center' }}>
        Internal Problem Logger ©2018 Created by Maniet, Nguyen, Sacré & Vanmoortel
      </Layout.Footer>
    );
  }
}

export default Footer;
