// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import { QrPrintMachine, QrReaderMachine } from '../../components';
import {Redirect} from "react-router-dom";
import {Col, Layout, Row} from "antd";
import MachineImport        from '../../components/machineImport/MachineImport';

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
      <AnimatedView>
        <Row type="flew" justify="center" align="center">
          <Col offset={6} span={12} style={{textAlign:"center"}}>
            <h1>Scanner</h1>
            <QrReaderMachine delay={delay} handleError={handleError} handleScan={handleScan} scanClick={scanClick} showQr={showQr}/>
            <h4>{message}</h4>
            <MachineImport uploadFile={uploadFile}/>
          </Col>
        </Row>
        {scanSuccess?<Redirect to={"report/"+url.split('/')[url.split('/').length-1]}/>:''}
      </AnimatedView>
    );
  }
}

export default Home;
