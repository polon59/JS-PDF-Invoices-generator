import React, { Component } from 'react';
import Service from './Service';


class Services extends Component{

    state = {
        services : this.props.services
    }


    handleChange = () => {
    }

    render(){
        if (this.props.services.length > 0){
            //Change to this.state.services
            const servicesList = this.props.services.map(service =>{
                return (
                    <Service key={service.id} service={service} handleChange={this.handleChange}/>
                );
            });
            return(
                <div>
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
                </div>
            )
        }
    }
}

export default Services;