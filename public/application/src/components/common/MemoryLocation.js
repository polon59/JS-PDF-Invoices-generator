import React from 'react'
import {Link} from 'react-router-dom';
import CheckCircle from '@material-ui/icons/CheckCircle';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Tooltip from '@material-ui/core/Tooltip';



const MemoryLocation = (props) =>{

    const {isOffline} = props;
    if (isOffline) {
        return(
            <Tooltip title="Delete">
                <OfflineBolt className='offlineIcon'/>
            </Tooltip>
        )
    }
    return (
      <Tooltip title="Delete">
        <CheckCircle className='onlineIcon'/>
      </Tooltip>
    )
}

export default MemoryLocation;