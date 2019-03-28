import React from 'react'
import {Link} from 'react-router-dom';
import CheckCircle from '@material-ui/icons/CheckCircle';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';



const MemoryLocation = (props) =>{

    const {isOffline} = props;
    if (isOffline) {
        const desc ='This invoice is saved locally';
        return(
            <Tooltip TransitionComponent={Zoom} title={desc}>
                <OfflineBolt className='offlineIcon'/>
            </Tooltip>
        )
    }
    const desc ='Successfully saved in database.';
    return (
      <Tooltip className={'tooltip'} TransitionComponent={Zoom} title={desc}>
        <CheckCircle className='onlineIcon'/>
      </Tooltip>
    )
}

export default MemoryLocation;