import React, { Component } from 'react';

class Service extends Component{


    handleChange = (e) => {
        console.log("handle");
    }

    render(){
        const { service } = this.props;
        return (
            <tr>
                <td>
                    {service.id}
                </td>
                <td>
                    <input value={service.description} onChange={this.handleChange}/>
                </td>
                <td>
                    <input value={service.quantity} onChange={this.handleChange}/>
                </td>
                <td>
                    <input value={service.cost} onChange={this.handleChange}/>
                </td>
                <td>
                    <input value={service.tax} onChange={this.handleChange}/>
                </td>
            </tr>
        );
    }
}

export default Service;