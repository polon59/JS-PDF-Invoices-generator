import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MyAccount extends Component{

    render(){
        return(
            <div>
                <div className="bordered">
                    <h3>Welcome Username</h3>
                    <p>this is some text added to look like it is nessesary, but honestly i added it to fill this empty space</p>
                </div>
                <Link to='/myInvoices'>
                    <div className="optionBox bordered"><h4>View current invoices</h4></div>
                </Link>
                <Link to='/addInvoice'>
                    <div className="optionBox bordered"><h4>Create new invoice</h4></div>
                </Link>
                <Link to='/statistics'>
                    <div className="optionBox bordered"><h4>View statistics</h4></div>
                </Link>
            </div>
        );
    }
}

export default MyAccount;