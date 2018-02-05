// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import Counter        from '../../components/counter/Counter';
import PrintQrButton  from '../../components/qrHandler/printQr/qrPrintMachine';
import ScanQrButton   from '../../components/qrHandler/scanQr/scanQrButton';
import QrReader       from 'react-qr-reader';

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
    scanSuccess:        PropTypes.boolean,
    showQr:             PropTypes.boolean
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
      value,
      increment,
      decrement,
      doubleAsync,
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
        <h1>Counter</h1>
        <Counter value={value} handleIncrement={increment} handleDecrement={decrement} handleDoubleAsync={doubleAsync}/>
        <h1>Printer</h1>
        <PrintQrButton urlMachine="not a valid url"/>
        <h1>Scanner</h1>
        <h4>{message}</h4>
        <ScanQrButton onClick={scanClick}/>
        {showQr?<QrReader
        delay={delay}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '50%' }}
      />:''}
        {scanSuccess?this.goToHell(url):''}

      </AnimatedView>
    );
  }

  goToHell = (urlQr: string,
    event: SyntheticEvent<>
  ) => {
    console.log('IN GO HOME');
    if (event) {
      event.preventDefault();
    }

    const {
      history
    } = this.props;
    const shortenedUrl = urlQr.split('/');
    history.push({ pathname: 'report/'+shortenedUrl[shortenedUrl.length-1] });
  }
}

export default Protected;
