import React, { Component } from 'react';
import Services from './Services';
import InvoiceSummary from './InvoiceSummary';
import {Link,withRouter} from 'react-router-dom';

class EditInvoice extends Component{

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.props.redirect)
        switch (this.props.redirect) {
            case 'invoices':
                this.props.history.push('/myInvoices');
                break;
            case 'view':
                this.props.history.push(`/myInvoices/viewInvoice/${this.props.invoiceToEdit.id}`);
            break;        
        }
        
        this.props.saveChanges();
    }

    handleChange = (e) => {
        this.props.changeInvoiceToEdit(e);
    }

    handleServiceDelete = (serviceId) =>{
        this.props.deleteServiceFromInvoice(serviceId);
    }

    resize = (target) =>{
        target.style.height = 'auto';
        target.style.height = target.scrollHeight+'px';
    }

    setInitialTextareasSize = () =>{
        let billfrom = document.getElementById("billFrom");
        let billto = document.getElementById("billTo");
        this.resize(billfrom);
        this.resize(billto);
    }

    componentDidMount(){
        this.setInitialTextareasSize();
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
                    <form onSubmit={this.handleSubmit}>
                        <div className="invoice-header invoice-section">
                            <input type="text" id="title" placeholder="TITLE" value={this.props.invoiceToEdit.title} onChange={this.handleChange} required/>
                            <input id="date" type="date" className="right" value={this.props.invoiceToEdit.date} onChange={this.handleChange} min="2015-01-01" required/>
                        </div>
                        <div className="invoice-company invoice-section">
                            <textarea id="billTo" placeholder="BILL TO" value={this.props.invoiceToEdit.billTo} onChange={(e)=>{this.handleChange(e); this.resize(e.target)}} required/>
                            <textarea id="billFrom" placeholder="BILL FROM" className="right" value={this.props.invoiceToEdit.billFrom} onChange={(e)=>{this.handleChange(e); this.resize(e.target)}} required/>
                        </div>  
                        <Services handleServiceDelete={this.handleServiceDelete} calculateSubTotal={this.props.calculateSubTotal} handleChange={this.handleChange} addService={this.props.addService} services={this.props.invoiceToEdit.services}/>
                        <InvoiceSummary invoiceToEdit={this.props.invoiceToEdit} handleChange={this.handleChange}/>               
                        <input type="submit" value="Save invoice"/>
                    </form>
                </div>
            )
        }
    }
}

export default withRouter(EditInvoice);