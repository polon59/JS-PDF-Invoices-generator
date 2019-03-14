import * as JsPDF from 'jspdf'
import * as html2canvas from 'html2canvas';

class PDFGenerator{

    generateDocument = () =>{
        const invoice = document.getElementById("PDF-Content");

        html2canvas(invoice).then(canvas => {
            const img = canvas.toDataURL("image/png");
            let doc = new JsPDF();
            doc.addImage(img, 'JPEG',20,20);
            doc.save('document.pdf');
        });

        // html2canvas(invoice, {
        //     onrendered:function (canvas){
        //         const img = canvas.toDataURL("image/png");
        //         let doc = new JsPDF();
        //         doc.addImage(img, 'JPEG',20,20);
        //         doc.save('document.pdf');
        //     }});

        // let specialElementHandlers = {
        //     '#editor': function (element, renderer) {
        //         return true;
        //     }
        // };

        // this.doc.fromHTML(invoice, 10, 10, {
        //     'width': 170,
        //     'elementHandlers': specialElementHandlers
        // });
        // this.doc.save('document.pdf');
    }
}

export default PDFGenerator;