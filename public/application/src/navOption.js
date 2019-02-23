import React, { Component } from 'react';

class NavOption extends Component{
        state = {
            
        }

    handleClick = () =>{
        const {destination} = this.props;
        this.props.changeTogle(destination);
    }

    render(){
        const {title} = this.props;
        return(
            <div>
                <h4 onClick={this.handleClick}>{title}</h4>
            </div>
        );
    }
    
}

export default NavOption;