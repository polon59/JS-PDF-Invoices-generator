import React, { Component } from 'react';

class MyAccount extends Component{

    render(){
        return(
            <div>
                <div className="optionBox bordered"><h4>View current invoices</h4></div>
                <div className="optionBox bordered"><h4>Create new invoice</h4></div>
                <div className="optionBox bordered"><h4>View statistics</h4></div>
            </div>
        );
    }
}

export default MyAccount;