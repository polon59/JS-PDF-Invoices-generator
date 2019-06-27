import React from 'react'

const ViewService = (props) =>{
    const {description,quantity,unitPrice,total} = props.service;
    const {index} = props;
    return(
        <tr>
            <td>{index+1}</td>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{unitPrice}</td>
            <td>{total.toFixed(2)}</td>
        </tr>
    )
}

export default ViewService;