import React from 'react'

const ViewService = (props) =>{
    const {description,quantity,unitPrice,total} = props.service;
    return(
        <tr>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{unitPrice}</td>
            <td>{total}</td>
        </tr>
    )
}

export default ViewService;