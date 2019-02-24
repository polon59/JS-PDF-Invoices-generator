import React, { Component } from 'react';
import Services from './Services';

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
                        <input type="text" id="billTo" value={this.props.invoiceToEdit.billTo} onChange={this.handleChange}/>
                        <label htmlFor="title">Bill from:</label>
                        <input type="text" id="billFrom" value={this.props.invoiceToEdit.billFrom} onChange={this.handleChange}/>
                        <Services handleServiceDelete={this.handleServiceDelete} calculateSubTotal={this.props.calculateSubTotal} handleChange={this.handleChange} addService={this.props.addService} services={this.props.invoiceToEdit.services}/>
                        <h4>SUBTOTAL: {this.props.invoiceToEdit.subTotal}</h4>
                        <label htmlFor="title">tax %:</label>
                        <input type="text" id="salesTax" value={this.props.invoiceToEdit.salesTax} onChange={this.handleChange}/>
                        <h4>SALES TAX: {this.props.invoiceToEdit.salesTaxVal}</h4>
                        <h3>TOTAL DUE{this.props.invoiceToEdit.totalDue}</h3>
                        <input type="submit" value="submit"/>
                    </form>
                </div>
            )
        }
    }
}

export default EditInvoice;