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
            let fullFormattedData = [];
            // let servicesStats = result[0];
            // let invoicesStats = result[1]['numberOfInvoices'];
            console.log(result);

            // console.log(servicesStats);
            result.forEach((dataElement) => {
                let currentStatsName = Object.keys(dataElement)[0];
                let formattedDataElement =  {} ;
                formattedDataElement[currentStatsName] = [];
                for (let monthNo = 1; monthNo < 13; monthNo++) {
                    let dataElements = dataElement[Object.keys(dataElement)[0]]
                    let formattedRecord = {};
                    formattedRecord['month'] = monthNo;
                    formattedRecord[currentStatsName] = 0;
                    dataElements.forEach(record => {
                        if (record.month === monthNo) {
                            console.log(record)
                            formattedRecord[currentStatsName] = record[Object.keys(record)[1]];
                        }
                    });
                    formattedDataElement[currentStatsName].push(formattedRecord);
                    
                }
                fullFormattedData.push(formattedDataElement);
            });
            console.log(fullFormattedData);

            // servicesStats.forEach(element => {
            //     console.log(`month ${element.month} done services: ${element.doneServices}`);
            // });

            // invoicesStats.forEach(element => {
            //     console.log(`month ${element.month} created Invoices: ${element.createdInvoices}`);
            // });



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

        return(
            <div>
                <CreatedDataChart/>
            </div>
        )
    }
}

export default Statistics;