import React from 'react';

const InvoicesList = (props)=>{
    const { invoices } = props;
    const invoicesList = invoices.map(invoice =>{
        return (
            <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.title}</td>
                <td>{invoice.billTo}</td>
            </tr>
        );
    });

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>BILL TO</th>
                    </tr>
                </thead>
                <tbody>
                {invoicesList}
                </tbody>
            </table>
            
        </div>
    );
}

export default InvoicesList;