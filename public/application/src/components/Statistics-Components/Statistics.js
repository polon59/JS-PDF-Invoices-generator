import React, { Component } from 'react'
import CreatedDataChart from './Charts-Components/CreatedDataChart';

class Statistics extends Component{
    constructor(props){
        super();
        this.DBAccess = props.DBAccess;
        this.state = {
            data : null
        }
    }

    componentWillMount() {
        this.DBAccess.getStatisticsForYear(2019).then((result)=>{

            let servicesStats = result[0]['numberOfServices'];
            let invoicesStats = result[1]['numberOfInvoices'];

            servicesStats.forEach(element => {
                console.log(`month ${element.month} done services: ${element.doneServices}`);
            });

            invoicesStats.forEach(element => {
                console.log(`month ${element.month} created Invoices: ${element.createdInvoices}`);
            });



            this.setState({
                data: result,
            });
        })
    }
    


    render(){
        const {data} = this.state;
        if (!data) {
            return (
                <div><h3>Loading data...</h3></div>
            )
        }
        console.log(data[0]['numberOfServices'][0])

        return(
            <div>
                <CreatedDataChart/>
            </div>
        )
    }
}

export default Statistics;