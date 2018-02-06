// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QrReader       from 'react-qr-reader';
import {Button}       from 'antd';
import scanQr         from './img/scanQr.png';
import styles         from './QrReaderMachine.scss';

class QrReaderMachine extends PureComponent {
// eslint-disable-next-line no-undef
  static propTypes = {
    delay:              PropTypes.number.isRequired,
    handleError:        PropTypes.func.isRequired,
    handleScan:         PropTypes.func.isRequired,
    scanClick:          PropTypes.func.isRequired,
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
        <p>{
          showQr?
            <QrReader
              delay={delay}
              onError={handleError}
              onScan={handleScan}
              style={{ minWidth: '250px', maxWidth:'500px', marginLeft:"auto", marginRight:"auto" }}/>
            :'Scannez un QR code'
        }</p>


        {showQr?<Button type='default' size='large' onClick={this.handleClick}>STOP SCANNING</Button>:
          <Button className={styles.removeBorders} style={{height:'auto'}} onClick={this.handleClick}>  <img className={styles.imgQr} src={scanQr} /></Button>
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
