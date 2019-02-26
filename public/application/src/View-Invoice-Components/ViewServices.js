import React from 'react'

const ViewServices = (props) =>{
    const servicesList = this.props.services.map(service =>{
        return (
            <ViewService key={service.id} service={service}/>
        );
    });
    return(
        <table>
            <thead>
                <tr>
                    <th>DESCRIPTION</th>
                    <th>QUANTITY</th>
                    <th>UNIT PRICE</th>
                </tr>
            </thead>
            <tbody>
            {servicesList}
            </tbody>
        </table>
    );
}

export default ViewServices;
