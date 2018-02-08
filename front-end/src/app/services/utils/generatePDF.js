import QRCode from 'qrcode';
import jspdf from 'jspdf';

export const generatePDF = (names) =>{
  const url = window.location.hostname+':'+window.location.port+'/report/';
  const pdf = new jspdf();
  let column = 0;
  let line = 0;
  names.map((name)=>{
    QRCode.toDataURL(url+name,{type:'image/jpeg'}, (err,urlImg)=>{
      if(column === 3){
        column = 0;
        line = line +1;
      }
      if(line ===  5){
        pdf.addPage();
        line = 0;
      }
      pdf.addImage(urlImg,'JPEG', 10+(70*column), 0+(60*line));
      pdf.text("Signaler un problème !", 2+(70*column), 45+(60*line));
      pdf.text(name, 17+(70*column), 52+(60*line));

      column = column +1;
    });
  });
  pdf.save(names[0]+'('+names.length+').pdf');
};
