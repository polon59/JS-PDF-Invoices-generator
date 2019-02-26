import * as JsPDF from 'jspdf'

class PDFGenerator{

    constructor(){
        this.doc = new JsPDF();
    }

    generateDocument = () =>{
        const invoice = document.getElementById("editInvoice").innerHTML;

        let specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        this.doc.fromHTML(invoice, 10, 10, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        this.doc.save('document.pdf');
    }
}

export default PDFGenerator;