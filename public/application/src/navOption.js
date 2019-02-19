import React from 'react';

const NavOption = (props) =>{
    const { title, desc } = props;
    return(
        <div>
            <div>{title}</div>
            <div>{desc}</div>
        </div>
    );
}

export default NavOption;