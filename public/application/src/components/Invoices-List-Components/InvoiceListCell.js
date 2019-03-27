import React from 'react'
import {Link} from 'react-router-dom';

const InvoiceListCell = (props) =>{

    let location = "online"
    const {changeCurrentInvoice,deleteInvoice,invoice,index} = props;
    if (invoice.isOffline) {location = "offline"}

    return (
        <tr key={invoice.id}>
            <td className='invoicesTableCell'>{index+1}</td>
            <td className='invoicesTableCell'>{location}</td>
            <td className='invoicesTableCell'>{invoice.id}</td>
            <td className='invoicesTableCell'>{invoice.title}</td>
            <td className='invoicesTableCell'>{invoice.billTo}</td>
            <td className='invoicesTableCell'>
                <Link to={`/myInvoices/editInvoice/${invoice.id}`}>
                    <button onClick={()=>{changeCurrentInvoice(invoice.id)}}>EDIT</button>
                </Link>
            </td>
            <td className='invoicesTableCell'>
                <Link to={`/myInvoices/viewInvoice/${invoice.id}`}>
                    <button onClick={()=>{changeCurrentInvoice(invoice.id)}}>VIEW</button>
                </Link>
            </td>
            <td className='invoicesTableCell'>
                <button onClick={()=>{deleteInvoice(invoice.id)}}>X</button>
            </td>
        </tr>
    )
}

export default InvoiceListCell;