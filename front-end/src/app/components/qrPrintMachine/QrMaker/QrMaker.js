// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QRCode         from 'qrcode-react';

class QrMaker extends PureComponent {
// eslint-disable-next-line no-undef
  static propTypes = {
    urlMachine: PropTypes.string.isRequired
  };


  render() {
    const { urlMachine } = this.props;
    return (
        <QRCode value={urlMachine}/>
    );
  }
}


export default QrMaker;
