import React from 'react'
import StillLoading from './StillLoading';
import EmptyDataMessage from './EmptyDataMessage';

const WrongFetchData = (props) =>{
    const {reason} = props;

    if (reason === 'empty') {
        return (
            <EmptyDataMessage/>
        );
    } else if (reason === 'fetchError') {
        return(
            <div>
                <h3>
                    Error: You are offline. Cannot get statistics data from server.
                </h3>
            </div>
        );
    } else if (reason === 'noServices') {
        return(
            <EmptyDataMessage/>
        );
    }
    return(
        <div>
            <h3>Loading data...</h3>
            <StillLoading/>
        </div>
    )


}

export default WrongFetchData;