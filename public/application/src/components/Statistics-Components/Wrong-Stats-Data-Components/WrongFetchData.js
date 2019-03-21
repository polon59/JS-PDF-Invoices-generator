import React from 'react'

const WrongFetchData = (props) =>{
    const {reason} = props;

    if (reason === 'empty') {
        return (
            <div>
                <h3>
                    Statistics data is empty. Charts cannot be displayed. Create at least one invoice with at
                    least one service ==> LINK WITH ICON HERE
                </h3>
            </div>
        );
    } else if (reason === 'fetchError') {
        return(
            <div>
                <h3>Error: You are offline. Cannot get statistics data from server.</h3>
            </div>
        );
    }
    return(
        <div>
            <h3>Loading data...</h3>
        </div>
    )


}

export default WrongFetchData;