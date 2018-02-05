// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QRCode         from 'qrcode-react';

class qrPrintMachine extends PureComponent {
// eslint-disable-next-line no-undef
  static propTypes = {
    urlMachine: PropTypes.string.isRequired
  };


  render() {
    const { urlMachine } = this.props;
    return (
      <div>
        <h1>{urlMachine}</h1>
        <QRCode value={urlMachine} />
        <p>Scan me !</p>
      </div>
    );
  }
}


export default qrPrintMachine;
