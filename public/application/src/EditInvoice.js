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
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" value={this.props.invoiceToEdit.title} onChange={this.handleChange}/>
                        <label htmlFor="title">Bill to:</label>
                        <textarea id="billTo" value={this.props.invoiceToEdit.billTo} onChange={this.handleChange}/>
                        <label htmlFor="title">Bill from:</label>
                        <textarea id="billFrom" value={this.props.invoiceToEdit.billFrom} onChange={this.handleChange}/>
                        <Services handleServiceDelete={this.handleServiceDelete} calculateSubTotal={this.props.calculateSubTotal} handleChange={this.handleChange} addService={this.props.addService} services={this.props.invoiceToEdit.services}/>
                        
                        <InvoiceSummary invoiceToEdit={this.props.invoiceToEdit} handleChange={this.handleChange}/>
                       
                       
                        
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            )
        }
    }
}

export default EditInvoice;