// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import { QrReaderMachine } from '../../components';
import {Redirect} from "react-router-dom";
import {Col, Row} from "antd";

class Home extends PureComponent {
  static propTypes= {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView:  PropTypes.string.isRequired,
    enterHome:    PropTypes.func.isRequired,
    leaveHome:    PropTypes.func.isRequired,
    redirected:    PropTypes.func.isRequired,

    url:                PropTypes.string.isRequired,
    message:            PropTypes.string.isRequired,
    delay:              PropTypes.number.isRequired,
    handleError:        PropTypes.func.isRequired,
    handleScan:         PropTypes.func.isRequired,
    scanClick:          PropTypes.func.isRequired,
    scanSuccess:        PropTypes.bool.isRequired,
    showQr:             PropTypes.bool.isRequired,

    uploadFile:         PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterHome } = this.props;
    enterHome();
  }

  componentWillUnmount() {
    const { leaveHome } = this.props;
    const { redirected } = this.props;
    redirected();
    leaveHome();

  }


  render() {
    const {
      delay,
      handleError,
      handleScan,
      scanClick,
      showQr,
      scanSuccess,
      url,
      message,
      uploadFile

    } = this.props;
    return(
      <Row>
        <Col span={6} ></Col>
          <Col xs={{span:12}} md={{span:6, offset:3}} style={{textAlign:"center"}}>
            <h1>Scannez le QR code</h1>
              <div style={{maxHeight:300}}>
              <QrReaderMachine delay={delay} handleError={handleError} handleScan={handleScan} scanClick={scanClick} showQr={showQr}/>
            </div>
            <h4>{message}</h4>
          </Col>
        {scanSuccess?<Redirect to={"report/"+url.split('/')[url.split('/').length-1]}/>:''}
      </Row>
    );

  }
}

export default Home;
