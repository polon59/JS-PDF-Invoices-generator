import React from 'react'
import {Link} from 'react-router-dom';

const InvoiceListCell = (props) =>{

    let location = "online"
    const {changeCurrentInvoice,deleteInvoice,invoice,index} = props;
    if (invoice.isOffline) {location = "offline"}

    return (
        <tr key={invoice.id}>
            <td>{index+1}</td>
            <td>{location}</td>
            <td>{invoice.id}</td>
            <td>{invoice.title}</td>
            <td>{invoice.billTo}</td>
            <td>
                <Link to={`/myInvoices/editInvoice/${invoice.id}`}>
                    <button onClick={()=>{changeCurrentInvoice(invoice.id)}}>EDIT</button>
                </Link>
            </td>
            <td>
                <Link to={`/myInvoices/viewInvoice/${invoice.id}`}>
                    <button onClick={()=>{changeCurrentInvoice(invoice.id)}}>VIEW</button>
                </Link>
            </td>
            <td>
                <button onClick={()=>{deleteInvoice(invoice.id)}}>X</button>
            </td>
        </tr>
    )
}

export default InvoiceListCell;