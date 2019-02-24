import React, { Component } from 'react';
import EditInvoice from './EditInvoice';

class AddInvoice extends Component{

    handleSubmit = () =>{
        this.props.addCreatedInvoiceToList();
    }

    render(){
        const {invoiceToEdit,deleteService,addService,changeInvoiceToEdit,calculateSubTotal} = this.props;
        return(
            <EditInvoice deleteServiceFromInvoice={deleteService} 
            saveChanges={this.handleSubmit} 
            addService={addService} 
            calculateSubTotal={calculateSubTotal}
            changeInvoiceToEdit={changeInvoiceToEdit} 
            invoiceToEdit={invoiceToEdit}/>            
        )
    }
}

export default AddInvoice;