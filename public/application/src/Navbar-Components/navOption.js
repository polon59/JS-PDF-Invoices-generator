import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavOption extends Component{
        state = {
            
        }

    handleClick = () =>{
        console.log("change style");
    }

    render(){
        const {title, destination} = this.props;
        return(
            <div>
                <Link to={destination}>
                    <h4 className="clickable" onClick={this.handleClick}>{title}</h4>
                </Link>
            </div>
        );
    }
    
}

export default NavOption;