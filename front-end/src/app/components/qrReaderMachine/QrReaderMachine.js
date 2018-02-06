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
        <div style={{ width: '100%', mawWidth:'500px'}}>
        {
          showQr?
            <QrReader
              delay={delay}
              onError={handleError}
              onScan={handleScan}
              showViewFinder={false}/>
            :''
        }
        </div>

        {showQr?<Button type="primary" size="large" style={{width:'100%', marginTop:10}} onClick={this.handleClick}>STOP SCANNING</Button>:
          <div style={{textAlign:'center'}}>
            <Button className={styles.removeBorders} style={{height:'auto'}} onClick={this.handleClick}>  <img className={styles.imgQr} src={scanQr} /></Button>
            <Button style={{width:'100%', marginTop:10}} type="primary" size="large" onClick={this.handleClick}>SCANNING</Button>
          </div>
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
