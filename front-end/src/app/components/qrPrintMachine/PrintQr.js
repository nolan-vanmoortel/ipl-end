// @flow weak

import React, {
  PureComponent
}                     from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import PropTypes      from 'prop-types';
import QrMaker        from '../../components/qrPrintMachine/QrMaker/QrMaker';
import h2c            from 'html2canvas';
import jsPDF          from 'jspdf';
import styles         from './printQr.scss';
import {Icon, Button} from 'antd';
import QRCode         from 'qrcode';
import JQuery         from 'jquery';

class PrintQr extends PureComponent {
  static propTypes= {
    machines: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired
  };

  state = {
    qrDisplayed: false
  };

  fillPage = () => {
    return toPrint;
  };

  printDocument = async () => {
    const { name, machines } = this.props;
    const pdf = new jsPDF();
    machines.forEach((machine) => {
      const code = QRCode.toDataURL(window.location.hostname+':'+window.location.port+'/report/machine1',
        {type: 'image/jpeg'}, function(err, url) {
          if (err) throw err;
          pdf.addImage(url,'JPEG', 0, 0);
          pdf.addImage(url, 'JPEG', 0, 0);
          document.getElementById("yolo").src = url;
          const temp = (
            <span key={machine}>
          <h3>Scannez-moi &nbsp;</h3>
          <h5>{machine} &nbsp;</h5>
          </span>);
          pdf.text(temp);
        });
    });
    pdf.save(name+'.pdf');
  };


  render() {
    const { machines } = this.props;
    return(
      <div>
        <Button onClick={this.printDocument}>
          <Icon type="printer"/>Imprimer
        </Button>
        <img id="yolo" />
      </div>
    );
  }
}

export default PrintQr;
