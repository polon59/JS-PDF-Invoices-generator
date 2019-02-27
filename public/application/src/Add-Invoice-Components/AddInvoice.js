import React, { Component } from 'react';
import EditInvoice from '../Edit-Invoice-Components/EditInvoice';

class AddInvoice extends Component{
    constructor(){
        super();
        this.inv = "";
    }

    handleSubmit = () =>{
        this.props.addCreatedInvoiceToList();
    }

    componentWillMount(){
        this.inv = this.props.createNewInvoice();
    }

    render(){
        const {deleteService,addService,changeInvoiceToEdit,calculateSubTotal} = this.props;
        return(
            <EditInvoice deleteServiceFromInvoice={deleteService} 
            saveChanges={this.handleSubmit} 
            addService={addService} 
            calculateSubTotal={calculateSubTotal}
            changeInvoiceToEdit={changeInvoiceToEdit} 
            invoiceToEdit={this.inv}/>            
        )
    }
}

export default AddInvoice;