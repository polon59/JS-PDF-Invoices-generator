import { SnackbarProvider } from 'notistack';
import React, { Component } from 'react';
import App from './App';

class Main extends Component{

    render(){
        return(
            <SnackbarProvider maxSnack={3}>
                <App/>
            </SnackbarProvider>
        )
    }
}

export default Main;