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
  };

  componentDidMount() {
    const { enterPrintQr } = this.props;
    enterPrintQr();
  }

  componentWillUnmount() {
    const { leavePrintQr } = this.props;
    leavePrintQr();
  }

  fillPage = () => {
    const toPrint = [];
    this.props.match.params.machineName.split(';').map((m, i) => {
      if (i%4===0 && i>0) {
        toPrint.push(<br/>);
      }
      toPrint.push(
        <span style={{display:'inline-block'}}>
        <h3>Scannez-moi<br/>en cas de problème &nbsp;</h3>
          <h5>Machine name : {m} &nbsp;</h5>
        <QrPrint key={i} urlMachine = {window.location.hostname+':'+window.location.port+'/report/'+m} />
        </span>
      );
    });
    return toPrint;
  };

  render() {
    const toPrint = this.fillPage();
    return(
      <div>
        {toPrint}
      </div>
    );
  }
}

export default PrintQr;
