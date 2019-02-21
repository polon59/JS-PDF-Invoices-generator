import React, { Component } from 'react';
import Service from './Service';


class Services extends Component{

    state = {
        services : this.props.services
    }


    addService = (e) => {
        e.preventDefault();
        let services = this.state.services;
        services.push({
            id: Math.random(),
            description: "",
            quantity: "",
            cost: "",
            tax: ""
        });

        this.setState({
            services:services
        })
    }

    render(){
        if (this.props.services.length > 0){
            const servicesList = this.props.services.map(service =>{
                return (
                    <Service key={service.id} service={service} handleChange={this.handleChange}/>
                );
            });
            return(
                <div>
                <button onClick={this.addService}>ADD SERVICE</button>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DESCRIPTION</th>
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
                    <button onClick={this.addService}>ADD SERVICE</button>
                </div>
            )
        }
    }
}

export default Services;