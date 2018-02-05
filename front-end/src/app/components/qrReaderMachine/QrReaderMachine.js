// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QrReader       from 'react-qr-reader';
import {Button} from "antd";

class QrReaderMachine extends PureComponent {
// eslint-disable-next-line no-undef
  static propTypes = {
    delay:              PropTypes.number.isRequired,
    handleError:        PropTypes.func.isRequired,
    handleScan:         PropTypes.func.isRequired,
    scanClick:          PropTypes.func.isRequired,
    scanSuccess:        PropTypes.bool.isRequired,
    showQr:             PropTypes.bool.isRequired
  };


  render() {
    const {
      delay,
      handleError,
      handleScan,
      showQr
    } = this.props;
    return (
      <div>
        <Button onClick={this.handleClick}/>
          {
            showQr?
              <QrReader
                delay={delay}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '50%' }}/>
              :''
          }
      </div>
    );
  }
  // eslint-disable-next-line no-undef
  handleClick = () => {
    const { scanClick } = this.props;
    scanClick();
  }
}

export default QrReaderMachine;
