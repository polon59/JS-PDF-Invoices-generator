import React, { Component } from 'react';
import ViewServices from './ViewServices';
import ViewInvoiceSummary from './ViewInvoiceSummary';
import PDFGenerator from './PDF-generators/PDFGenerator';
import {Link} from 'react-router-dom';

class ViewInvoice extends Component{

    generatePDFFromInvoice = ()=>{   
        const generator = new PDFGenerator();
        generator.generateDocument();
    }

    render(){
        const {invoiceToEdit,setInvoiceToEdit} = this.props;
        const {id,title,date,billFrom,billTo,services} = invoiceToEdit;
        return(
        <div className="bordered">
            <h3>VIEW INVOICE</h3>
            <div id="PDF-Content">
                <div className="invoice-header invoice-section">
                    <h4>{title}</h4>
                    <h4>{date}</h4>
                </div>
                <div className="invoice-company invoice-section">
                    <h4>{billTo}</h4>
                    <h4>{billFrom}</h4>
                </div>
                <div className="invoice-services">
                    <ViewServices services={services}/>
                </div>
                <div className="invoice-summary">
                    <ViewInvoiceSummary invoiceToEdit={invoiceToEdit}/>
                </div>
            </div>
            <div id="editor"></div>
            <button id="cmd" onClick={this.generatePDFFromInvoice}>generate PDF</button>
            <Link to={`/myInvoices/editInvoice/${id}`}>
                <button onClick={()=>{setInvoiceToEdit(id)}}>EDIT</button>
            </Link>
        </div>
        )
    }
}

export default ViewInvoice;