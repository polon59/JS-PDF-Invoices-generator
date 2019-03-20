import React, { Component } from 'react'
import CreatedDataChart from './Charts-Components/CreatedDataChart';
import StatisticsDataParser from './data-parser/DataParser';

class Statistics extends Component{
    constructor(props){
        super();
        this.dataParser = new StatisticsDataParser();
        this.DBAccess = props.DBAccess;
        this.state = {
            areaChartsData : null
        }
    }

    componentWillMount() {
        this.DBAccess.getStatisticsForYear(2019).then((result)=>{
            console.log(result);
            let areaChartsResult = result.slice(0,4);
            // let sChartResult = result.slice(4,6);

            let areaChartsParsedData = this.dataParser.parseDataForStatistics(areaChartsResult);
            // console.log(areaChartsParsedData);
            this.setState({
                areaChartsData: areaChartsParsedData,
            });
        })
    }
    
    render(){
        const {areaChartsData} = this.state;
        if (!areaChartsData) {
            return (
                <div><h3>Loading data...</h3></div>
            )
        }
        return(
            <div>
                <CreatedDataChart chartsData={[areaChartsData[0],areaChartsData[1]]} areaFillColor={"#0289ff"} areaStrokeColor={"#0734ff"}/>
                <CreatedDataChart chartsData={[areaChartsData[2],areaChartsData[3]]} areaFillColor={"#01f2ff"} areaStrokeColor={"#0734ff"}/>
            </div>
        )
    }
}

export default Statistics;