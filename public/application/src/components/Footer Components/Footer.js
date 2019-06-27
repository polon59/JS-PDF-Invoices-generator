import React from 'react';
import Grid from '@material-ui/core/Grid';

const Footer = (props) =>{
    return(
        <footer>
            <Grid container spacing={24}>
                <Grid item sm={4} xs={12}>
                    <h4>area 1</h4>
                </Grid>
                <Grid  item sm={4} xs={12}>
                    <h4>area 2</h4>
                </Grid>
                <Grid  item sm={4} xs={12}>
                    <h4>area 3</h4>
                </Grid>
            </Grid>
            <p>
                Designed and built by @polon59 for Ślusarstwo Pawełczak 
                2019 <span className="glyphicon glyphicon-globe"></span>
            </p>
        </footer>
    )
}

export default Footer;