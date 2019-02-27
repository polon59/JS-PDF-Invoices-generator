import React, { Component } from 'react';
import NavOption from './navOption';

class Navbar extends Component{

    render(){

        return(
            <div>
                <NavOption title="My Account" destination={"/"}/>
                <NavOption title="My invoices" destination={'/myInvoices'}/>
                <NavOption title="Add new Invoice" destination={'/addInvoice'}/>
                <NavOption title="Statistics" destination={"/statistics"}/>
            </div>
        );
    }
}

export default Navbar;