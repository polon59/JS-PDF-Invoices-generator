import React from 'react'

const ViewServices = (props) =>{
    const servicesList = this.props.services.map(service =>{
        return (
            <Service key={service.id} service={service}/>
        );
    });
        return(
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
        );
    }
