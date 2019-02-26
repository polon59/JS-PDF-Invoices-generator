import * as JsPDF from 'jspdf'

class PDFGenerator{

    constructor(){
        this.doc = new JsPDF();
        console.log(this.doc);
    }
}

export default PDFGenerator;