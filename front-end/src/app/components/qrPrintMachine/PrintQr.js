// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import QrPrint        from '../../components/qrPrintMachine/QrMaker/QrMaker';
import h2c            from 'html2canvas';
import jsPDF          from 'jspdf';
import styles         from './printQr.scss';
import {Icon, Button} from 'antd';

class PrintQr extends PureComponent {
  static propTypes= {
    machineUrlParam: PropTypes.array.isRequired
  };

  state = {
    qrDisplayed: false
  };

  fillPage = () => {
    const toPrint = [];
    const { machineUrlParam } = this.props;
    console.log(machineUrlParam);
    machineUrlParam.split(';').map((m, i) => {
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

  printDocument = async (qrDisplayed) => {
    const { machineUrlParam } = this.props;
    const input = document.getElementById('ttp'+machineUrlParam);
    input.setAttribute('style', 'max-height : none;');
    input.setAttribute('style', 'visibility : visible;');
    return h2c(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save(machineUrlParam+'.pdf');
    });
  };


  render() {
    const toPrint = this.fillPage();
    const{ machineUrlParam } = this.props;
    const{ qrDisplayed } = this.state;
    if(qrDisplayed){
      this.printDocument(qrDisplayed).then(()=>this.setState({qrDisplayed:false}));
    }
    return(
      <div>
        <Button onClick={()=>this.setState({qrDisplayed: true})}><Icon type="printer"/>Print</Button>
        <div className = {styles.ttp} style = {{ height:qrDisplayed?'none':'1px', visibility:qrDisplayed?'visible':'hidden'}} id={'ttp'+machineUrlParam}>{toPrint}</div>
      </div>
    );
  }
}

export default PrintQr;
