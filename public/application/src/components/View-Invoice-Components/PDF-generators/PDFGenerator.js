import * as JsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';

class PDFGenerator{

    generateDocument = () =>{
        const invoice = document.getElementById("PDF-Content");

        html2canvas(invoice).then(canvas => {
            const img = canvas.toDataURL("image/png");
            let doc = new JsPDF();
            doc.addImage(img, 'png',0,0);
            doc.save('document.pdf');
        });
    }
}

export default PDFGenerator;