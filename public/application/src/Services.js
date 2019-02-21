import React, { Component } from 'react';

class Services extends Component{


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
    }
}

export default Services;