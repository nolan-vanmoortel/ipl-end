// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QrPrint        from '../../components/qrPrintMachine/QrPrintMachine';

class PrintQr extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:  PropTypes.string.isRequired,
    enterPrintQr:   PropTypes.func.isRequired,
    leavePrintQr:   PropTypes.func.isRequired,

    // url machine
    machineName: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      machineUrl: ''
    };
  }

  componentDidMount() {
    const { enterPrintQr } = this.props;
    this.setState({ machineUrl: window.location.hostname+':'+window.location.port+'/report/'+this.props.match.params.machineName });
    enterPrintQr();
  }

  componentWillUnmount() {
    const { leavePrintQr } = this.props;
    leavePrintQr();
  }

  render() {
    const {
      machineName
    } = this.props;
    return(
      <div>
        <span style={{display:'inline-block'}}>
        <h3>Scannez-moi<br/>en cas de problème </h3>
          <h5>Machine name : {machineName} &nbsp;</h5>
        <QrPrint urlMachine = {this.state.machineUrl} />
        </span>
      </div>
    );
  }
}

export default PrintQr;
