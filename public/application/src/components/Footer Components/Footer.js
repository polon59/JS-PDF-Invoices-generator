import React from 'react';
import Grid from '@material-ui/core/Grid';
import Help from '@material-ui/icons/Help';
import AddComment from '@material-ui/icons/AddComment';

const styles = {
    root:{
        height: '10%',
        marginTop: 20,
        backgroundColor: 'rgb(52, 109, 245)',
        color: 'rgb(255, 255, 255)',
        width: '100%',
        padding: 10,
        textAlign : 'center'
    },
    colMiddle: {
        fontSize: 'small'
    },
    colSide :{
        fontSize : 'medium'
    },
    icon:{
        fontSize : 'medium',
        marginRight: 5
    }
    
}

const Footer = (props) =>{
    return(
        <footer style={styles.root}>
            <Grid container spacing={24}>
                <Grid style={styles.colSide} item sm={4} xs={12}>
                    <p><AddComment style={styles.icon}/>Contact administrator</p>
                </Grid>
                <Grid style={styles.colMiddle} item sm={4} xs={12}>
                   <p>Designed and built by @polon59  InvoiceGenerator 2019</p>
                </Grid>
                <Grid style={styles.colSide} item sm={4} xs={12}>
                    <p><Help style={styles.icon}/>Help</p>
                </Grid>
            </Grid>
        </footer>
    )
}

export default Footer;