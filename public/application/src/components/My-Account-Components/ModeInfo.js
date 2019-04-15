import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Assessment from '@material-ui/icons/Assessment';
import ViewList from '@material-ui/icons/ViewList';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import CheckCircle from '@material-ui/icons/CheckCircle';
import OfflineBolt from '@material-ui/icons/OfflineBolt';

const styles ={
    paper: {
      margin:10,
      backgroundColor: 'rgb(24, 24, 35)',
      padding: 20,
      maxWidth: '100%',
      overflow: 'auto',
      color: 'inherit',
    },
    optIcon:{
        fontSize:70,
    },
    IconContainer:{
       textAlign:'center',
    },
    offlineIcon:{
        fontSize:45,
        margin:'auto',
    },
    onlineIcon:{
        fontSize:45,
        margin:'auto',
    }
  };

const ModeInfo = (props) =>{
    const {invoices, inOfflineMode} = props.props;

    console.log(props);
    const invoicesNumber = invoices.length;

    if (inOfflineMode){
        return (
            <Paper style={styles.paper}>
                <Grid container justify="center" alignItems="center" spacing={24}>
                    <Grid item sm={2} xs={3} style={styles.IconContainer}>
                        <OfflineBolt style={styles.offlineIcon}/>
                    </Grid>
                    <Grid item sm={3} xs={9}>
                        <p>You are in offline mode.</p>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <p>
                            Your invoices saved locally: {invoicesNumber}
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
    return (
        <Paper style={styles.paper}>
                <Grid container justify="center" alignItems="center" spacing={24}>
                    <Grid item sm={2} xs={3} style={styles.IconContainer}>
                        <CheckCircle style={styles.onlineIcon}/>
                    </Grid>
                    <Grid item sm={3} xs={9}>
                        <p>You are in online mode.</p>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <p>
                            You have {invoicesNumber} invoices saved in database.
                        </p>
                    </Grid>
                </Grid>
            </Paper>
    )
    

}

export default ModeInfo;