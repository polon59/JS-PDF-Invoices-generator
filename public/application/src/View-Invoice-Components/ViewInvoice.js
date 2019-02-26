import React, { Component } from 'react';
import ViewServices from './ViewServices';
import ViewInvoiceSummary from './ViewInvoiceSummary';
import PDFGenerator from './PDF-generators/PDFGenerator';

class ViewInvoice extends Component{

    generatePDFFromInvoice = ()=>{   
        const generator = new PDFGenerator();
        generator.generateDocument();
    }

    render(){
        return(
        <div className="bordered">
            <h3>VIEW INVOICE</h3>
            <div className="invoice-header invoice-section">
                <h4>{this.props.invoiceToEdit.title}</h4>
                <h4>{this.props.invoiceToEdit.date}</h4>
            </div>
            <div className="invoice-company invoice-section">
                <h4>{this.props.invoiceToEdit.billTo}</h4>
                <h4>{this.props.invoiceToEdit.billFrom}</h4>
            </div>
            <ViewServices services={this.props.invoiceToEdit.services}/>
            <ViewInvoiceSummary invoiceToEdit={this.props.invoiceToEdit}/>

            <div id="editor"></div>
            <button id="cmd" onClick={this.generatePDFFromInvoice}>generate PDF</button>
        </div>
        )
    }
}

export default ViewInvoice;