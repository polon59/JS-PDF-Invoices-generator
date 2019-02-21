import React, { Component } from 'react';

class EditInvoice extends Component{


    handleChange = (e) => {
        this.props.changeInvoiceToEdit(e);
    }

    render(){
        if (this.props.services.length > 0){
            const servicesList = this.props.services.map(service =>{
                return (
                    <tr key={service.id}>
                        <td>{service.id}</td>
                        <td>{service.description}</td>
                        <td>{service.quantity}</td>
                        <td>{service.cost}</td>
                        <td>{service.tax}</td>
                    </tr>
                );
            });
            return(
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>QUANTITY</th>
                                <th>COST</th>
                                <th>TAX %</th>
                            </tr>
                        </thead>
                        <tbody>
                        {servicesList}
                        </tbody>
                    </table>
                    
                </div>
            );
        }
        else{
            return (
                <div>
                    <h3>You have no active services</h3>
                </div>
            )
        }
















        <form onSubmit={this.handleSubmit}>
            <label>Description</label>
            <input type="text" id="description" value={this.props.invoiceToEdit.title} onChange={this.handleChange}/>
            <label>Bill to:</label>
            <input type="text" id="billTo" value={this.props.invoiceToEdit.billTo} onChange={this.handleChange}/>
            <label>Bill from:</label>
            <input type="text" id="billFrom" value={this.props.invoiceToEdit.billFrom} onChange={this.handleChange}/>
            <label>Services:</label>
            <Services services={this.props.invoiceToEdit.services}/>
            {/* <input type="text" id="services" value={this.props.invoiceToEdit.services} onChange={this.handleChange}/> */}
            <button>Submit</button>
        </form>
    }
}

export default Services;