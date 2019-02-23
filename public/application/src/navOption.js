import React from 'react';

const NavOption = (props) =>{
    const { title, chnageTogle, destination} = props;

    const handleClick = () =>{
        changeTogle(destination);
    }

    return(
        <div>
            <h4 onClick={handleClick}>{title}</h4>
        </div>
    );
}

export default NavOption;