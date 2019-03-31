import React from 'react'
import ViewService from './ViewService';

const ViewServices = (props) =>{
    const servicesList = props.services.map((service, i) =>{
        return (
            <ViewService key={service.id} index={i} service={service}/>
        );
    });
    return(

        <div className="invoice-services">
            <div className='servicesTable-wrapper'>
                <table className='servicesTable'>
                    <thead>
                        <tr className='servicesTableHead'>
                            <th></th>
                            <th>DESCRIPTION</th>
                            <th>QUANTITY</th>
                            <th>UNIT PRICE</th>
                            <th>AMMOUNT</th>
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

export default ViewServices;
