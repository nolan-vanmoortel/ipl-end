// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import { QrPrintMachine, QrReaderMachine } from '../../components';
import {Redirect} from "react-router-dom";


type Props ={
  match: any,
  location: any,
  history: any,

  currentView: string,
  checkUserIsConnected: () => any,
  firstname: string,
  lastname: string,
  showQr: boolean,
  scanSuccess: boolean,
  url: string,
  message: string
}
type State = {
}

class Protected extends PureComponent<Props, State> {
// eslint-disable-next-line no-undef
  static propTypes= {

    match:              PropTypes.object.isRequired,
    location:           PropTypes.object.isRequired,
    history:            PropTypes.object.isRequired,

    currentView:        PropTypes.string.isRequired,
    enterProtected:     PropTypes.func.isRequired,
    leaveProtected:     PropTypes.func.isRequired,

    firstname:          PropTypes.string.isRequired,
    lastname:           PropTypes.string.isRequired,
    value:              PropTypes.number.isRequired,
    increment:          PropTypes.func.isRequired,
    decrement:          PropTypes.func.isRequired,
    doubleAsync:        PropTypes.func.isRequired,

    url:                PropTypes.string.isRequired,
    message:            PropTypes.string.isRequired,
    delay:              PropTypes.number.isRequired,
    handleError:        PropTypes.func.isRequired,
    handleScan:         PropTypes.func.isRequired,
    scanClick:          PropTypes.func.isRequired,
    scanSuccess:        PropTypes.bool.isRequired,
    showQr:             PropTypes.bool.isRequired
  };

  componentWillMount() {
    const {
      checkUserIsConnected
    } = this.props;

    checkUserIsConnected();
  }

  componentDidMount() {
    const { enterProtected } = this.props;
    enterProtected();
  }

  componentWillUnmount() {
    const { leaveProtected } = this.props;
    leaveProtected();
  }

  render() {
    const {
      firstname,
      lastname,
      delay,
      handleError,
      handleScan,
      scanClick,
      showQr,
      scanSuccess,
      url,
      message

    } = this.props;

    return(
      <AnimatedView>
        <h1>
          Vous êtes connecté {firstname+' '+lastname} !
        </h1>
        <h1>Printer</h1>
        <QrPrintMachine urlMachine="not a valid url"/>
        <h1>Scanner</h1>
        <QrReaderMachine delay={delay} handleError={handleError} handleScan={handleScan} scanClick={scanClick} showQr={showQr}/>
        <h4>{message}</h4>

        {scanSuccess?<Redirect to={"report/"+url.split('/')[url.split('/').length-1]}/>:''}

      </AnimatedView>
    );
  }
}

export default Protected;
