import React from 'react'

const ViewService = (props) =>{
    const {description,quantity,unitPrice} = props.service;
    return(
        <tr>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{unitPrice}</td>
        </tr>
    )
}

export default ViewService;