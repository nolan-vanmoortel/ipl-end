// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QrPrint        from '../../components/qrPrintMachine/QrPrintMachine';
import h2c             from 'html2canvas';
import jsPDF          from 'jspdf';

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
        <span style={{display:'inline-block'}} key={i}>
        <h3>Scannez-moi &nbsp;</h3>
        <h5>{m} &nbsp;</h5>
        <QrPrint key={i} urlMachine = {window.location.hostname+':'+window.location.port+'/report/'+m} />
        </span>
      );
    });
    return toPrint;
  };

  printDocument = () => {
    const input = document.getElementById('Thing to print');
    h2c(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save(this.props.match.params.machineName+'.pdf');
    });
  };


  render() {
    const toPrint = this.fillPage();
    return(
      <div>
        <button onClick={this.printDocument}>Print</button>
        <div id="Thing to print">{toPrint}</div>
      </div>
    );
  }
}

export default PrintQr;
