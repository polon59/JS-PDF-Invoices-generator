import React, { Component } from 'react';
import Service from './Service';


class Services extends Component{

    addService = (e) => {
        let newService = {
            id: Math.random(),
            description: "",
            quantity: "",
            unitPrice: "",
        };
        this.props.addService(newService);
    }

    render(){
        if (this.props.services.length > 0){
            const servicesList = this.props.services.map(service =>{
                return (
                    <Service key={service.id} calculateSubTotal={this.props.calculateSubTotal} service={service} handleDelete={this.props.handleServiceDelete} handleChange={this.props.handleChange}/>
                );
            });
            return(
                <div className="invoice-services">
                <h5 className="clickable" onClick={this.addService}>ADD SERVICE</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIPTION</th>
                                <th>QUANTITY</th>
                                <th>UNIT PRICE</th>
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
                <div className="invoice-services">
                    <h3>You have no active services</h3>
                    <h5 className="clickable" onClick={this.addService}>ADD SERVICE</h5>
                </div>
            )
        }
    }
}

export default Services;