import React, { Component } from 'react'
import CreatedDataChart from './Charts-Components/CreatedDataChart';
import StatisticsDataParser from './data-parser/DataParser';

class Statistics extends Component{
    constructor(props){
        super();
        this.dataParser = new StatisticsDataParser();
        this.DBAccess = props.DBAccess;
        this.state = {
            data : null
        }
    }

    componentWillMount() {
        this.DBAccess.getStatisticsForYear(2019).then((result)=>{
            let parsedData = this.dataParser.parseDataForStatistics(result);
           
            console.log(parsedData);
            

            this.setState({
                data: parsedData,
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