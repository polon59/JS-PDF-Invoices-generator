import React, { Component } from 'react';
import NavOption from './navOption';

class Navbar extends Component{

    render(){

        return(
            <div>
                <NavOption title="My Account" changeTogle={this.props.changeTogle} destination={"MyAccount"}/>
                <NavOption title="My invoices" changeTogle={this.props.changeTogle} destination={"invoicesList"}/>
                <NavOption title="Add new Invoice" changeTogle={this.props.changeTogle} destination={"addInvoice"}/>
                <NavOption title="Statistics" changeTogle={this.props.changeTogle} destination={"statistics"}/>
            </div>
        );
    }
}

export default Navbar;