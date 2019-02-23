import React, { Component } from 'react';
import EditInvoice from './EditInvoice';

class AddInvoice extends Component{

    handleSubmit = () =>{
        this.props.addCreatedInvoiceToList();
    }

    render(){
        
        const {invoiceToEdit,deleteService,addService,changeInvoiceToEdit} = this.props;
        return(
            <EditInvoice deleteServiceFromInvoice={deleteService} 
            saveChanges={this.handleSubmit} 
            addService={addService} 
            changeInvoiceToEdit={changeInvoiceToEdit} 
            invoiceToEdit={invoiceToEdit}/>            
        )
    }
}

export default AddInvoice;