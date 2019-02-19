import React, { Component } from 'react';
import NavOption from './navOption';

class Navbar extends Component{
    
    render(){
        return(
            <div>
                <NavOption  title="Opt1" desc="descr1"/>
                <NavOption  title="Opt2" desc="descr2"/>
                <NavOption  title="Opt3" desc="descr3"/>
                <NavOption  title="Opt4" desc="descr4"/>
            </div>
        );
    }
}

export default Navbar;