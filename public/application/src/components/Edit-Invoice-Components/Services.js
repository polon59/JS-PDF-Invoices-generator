import React, { Component } from 'react';
import ServiceComponent from './Service';
import Service from './../../model/service';


class Services extends Component{

    addService = (e) => {
        let newService = new Service();
        this.props.addService(newService);
    }

    renderServicesList = () =>{
        const {services,calculateSubTotal,handleServiceDelete,handleChange} = this.props;
        return services.map((service,index) =>{
            return (
                <ServiceComponent 
                  key={service.id} 
                  index={index} 
                  calculateSubTotal={calculateSubTotal} 
                  service={service} 
                  handleDelete={handleServiceDelete} 
                  handleChange={handleChange}
                />
            );
        });
    }

    render(){
        if (this.props.services.length > 0){
            const servicesList = this.renderServicesList();
            return(
                <div className="invoice-services">
                    <h5 className="clickable" onClick={this.addService}>ADD SERVICE</h5>
                    <div className='servicesTable-wrapper'>
                        <table className='servicesTable'>
                            <thead>
                                <tr className='servicesTableHead'>
                                    <th></th>
                                    <th>DESCRIPTION</th>
                                    <th>QUANTITY</th>
                                    <th>UNIT PRICE</th>
                                    <th>AMMOUNT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {servicesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        return (
            <div className="invoice-services">
                <h3>You have no active services</h3>
                <h5 className="clickable" onClick={this.addService}>ADD SERVICE</h5>
            </div>
        )
    }
}

export default Services;