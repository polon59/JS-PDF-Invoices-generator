import React from 'react';

const AccountOptions = (props) =>{
    return (
        <Paper style={styles.paper}>
            <Grid container spacing={24}>
                <Grid  item sm={4} xs={12}>
                    <Link to='/myInvoices'>
                        <div className="optionBox bordered"><h4>View current invoices</h4></div>
                    </Link>
                </Grid>
                <Grid  item sm={4} xs={12}>
                    <Link to='/addInvoice'>
                        <div className="optionBox bordered"><h4>Create new invoice</h4></div>
                    </Link>
                </Grid>
                <Grid  item sm={4} xs={12}>
                    <Link to='/statistics'>
                        <div className="optionBox bordered"><h4>View statistics</h4></div>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    )

}

export default AccountOptions;