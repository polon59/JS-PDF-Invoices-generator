import React, { Component } from 'react';

class ViewInvoice extends Component{

    render(){
        return(
        <div>
        <h3>EDIT INVOICE</h3>
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