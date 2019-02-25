import React, { Component } from 'react';
import Services from './Services';
import InvoiceSummary from './InvoiceSummary';

class EditInvoice extends Component{

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.saveChanges();
    }

    handleChange = (e) => {
        this.props.changeInvoiceToEdit(e);
    }

    handleServiceDelete = (serviceId) =>{
        this.props.deleteServiceFromInvoice(serviceId);
    }

    resize = (e) =>{
        let {target} = e;
        target.style.height = 'auto';
        target.style.height = target.scrollHeight+'px';
    }

    render(){
        if(this.props.invoiceToEdit === ""){
            return(
                <div className="bordered">
                    <h3>No invoice to edit chosen</h3>
                </div>
            )
        }
        else{
            return(
                <div className="bordered">
                    <h3>EDIT INVOICE</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="invoice-header invoice-section">
                            <input type="text" id="title" placeholder="TITLE" value={this.props.invoiceToEdit.title} onChange={this.handleChange} required/>
                            <input id="date" type="date" className="right" value={this.props.invoiceToEdit.date} onChange={this.handleChange} min="2015-01-01" required/>
                        </div>
                        <div className="invoice-company invoice-section">
                            <textarea id="billTo" placeholder="BILL TO" value={this.props.invoiceToEdit.billTo} onChange={(e)=>{this.handleChange(e); this.resize(e)}} required/>
                            <textarea id="billFrom" placeholder="BILL FROM" className="right" value={this.props.invoiceToEdit.billFrom} onChange={(e)=>{this.handleChange(e); this.resize(e)}} required/>
                        </div>  
                        <div className="invoice-services">
                            <Services handleServiceDelete={this.handleServiceDelete} calculateSubTotal={this.props.calculateSubTotal} handleChange={this.handleChange} addService={this.props.addService} services={this.props.invoiceToEdit.services}/>
                            <InvoiceSummary invoiceToEdit={this.props.invoiceToEdit} handleChange={this.handleChange}/>
                        </div>                  
                        <input type="submit" value="Save invoice"/>
                    </form>
                </div>
            )
        }
    }
}

export default EditInvoice;