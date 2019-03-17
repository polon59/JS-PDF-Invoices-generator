import React, { Component } from 'react';
import Services from './Services';
import InvoiceSummary from './InvoiceSummary';
import {withRouter} from 'react-router-dom';

class EditInvoice extends Component{

    handleSubmit = (e) =>{
        e.preventDefault();
        const {redirect,invoiceToEdit,history,saveChanges} = this.props;
        if (redirect==='view') {
            history.push(`/myInvoices/viewInvoice/${invoiceToEdit.id}`);
        } else {
            history.push('/myInvoices');
        }   
        saveChanges();
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
        const {invoiceToEdit,calculateSubTotal,addService} = this.props;
        const {title,date,billTo,billFrom,services} = invoiceToEdit;
        if(invoiceToEdit === ""){
            return(
                <div className="bordered">
                    <h3>No invoice to edit chosen</h3>
                </div>
            )
        }
        return(
            <div className="bordered">
                <form onSubmit={this.handleSubmit}>
                    <div className="invoice-header invoice-section">
                        <input 
                            type="text"
                            id="title"
                            placeholder="TITLE"
                            value={title}
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            id="date"
                            type="date"
                            className="right" 
                            value={date} 
                            onChange={this.handleChange} 
                            required
                        />
                    </div>
                    <div className="invoice-company invoice-section">
                        <textarea 
                            id="billTo" 
                            placeholder="BILL TO" 
                            value={billTo} 
                            onChange={(e)=>{
                                this.handleChange(e); 
                                this.resize(e.target);
                            }} 
                            required
                        />
                        <textarea 
                            id="billFrom"
                            placeholder="BILL FROM"
                            className="right"
                            value={billFrom}
                            onChange={(e)=>{
                                this.handleChange(e);
                                this.resize(e.target)
                            }} 
                            required
                        />
                    </div>  
                    <Services 
                        handleServiceDelete={this.handleServiceDelete} 
                        calculateSubTotal={calculateSubTotal} 
                        handleChange={this.handleChange} 
                        addService={addService} 
                        services={services}
                    />
                    <InvoiceSummary invoiceToEdit={invoiceToEdit} handleChange={this.handleChange}/>               
                    <input type="submit" value="Save invoice"/>
                </form>
            </div>
        )
    }
}

export default withRouter(EditInvoice);