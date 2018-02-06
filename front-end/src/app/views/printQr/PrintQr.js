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
    urlMachine: PropTypes.string
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      urlMachine: ' '
    };
  }

  componentDidMount() {
    const { enterPrintQr } = this.props;
    this.setState({ urlMachine: window.location.hostname+'report/'+this.props.match.params.machineName });
    enterPrintQr();
  }

  componentWillUnmount() {
    const { leavePrintQr } = this.props;
    leavePrintQr();
  }

  render() {
    const {
      urlMachine
    } = this.props;
    return(
      <QrPrint urlMachine = {urlMachine} />
    );
  }
}

export default PrintQr;
