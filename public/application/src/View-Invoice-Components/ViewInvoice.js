import React, { Component } from 'react';

class ViewInvoice extends Component{

    render(){
        return(
        <div>
        <h3>EDIT INVOICE</h3>
            <div className="invoice-header invoice-section">
                <h4>{this.props.invoiceToEdit.title}</h4>
                <input id="date" type="date" className="right" value={this.props.invoiceToEdit.date} onChange={this.handleChange} min="2015-01-01" required/>
            </div>
            <div className="invoice-company invoice-section">
                <textarea id="billTo" placeholder="BILL TO" value={this.props.invoiceToEdit.billTo} onChange={(e)=>{this.handleChange(e); this.resize(e.target)}} required/>
                <textarea id="billFrom" placeholder="BILL FROM" className="right" value={this.props.invoiceToEdit.billFrom} onChange={(e)=>{this.handleChange(e); this.resize(e.target)}} required/>
            </div>  
            <Services handleServiceDelete={this.handleServiceDelete} calculateSubTotal={this.props.calculateSubTotal} handleChange={this.handleChange} addService={this.props.addService} services={this.props.invoiceToEdit.services}/>
            <InvoiceSummary invoiceToEdit={this.props.invoiceToEdit} handleChange={this.handleChange}/>               
            <input type="submit" value="Save invoice"/>
            <div id="editor"></div>
            <button id="cmd" onClick={this.generatePDFFromInvoice}>generate PDF</button>
        </div>
        )
    }
}

export default ViewInvoice;