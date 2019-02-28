import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MyAccount extends Component{

    render(){
        return(
            <div>
                <div className="bordered">
                    <h3>Welcome user1</h3>
                    <p>this is some text added to look like it is nessesary, but honestly i added it to fill this empty space</p>
                </div>
                <div className="optionBox bordered"><h4>View current invoices</h4></div>
                <div className="optionBox bordered"><h4>Create new invoice</h4></div>
                <div className="optionBox bordered"><h4>View statistics</h4></div>
            </div>
        );
    }
}

export default MyAccount;