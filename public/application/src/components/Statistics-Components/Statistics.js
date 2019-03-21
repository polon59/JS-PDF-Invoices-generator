import React, { Component } from 'react'
import AreaChartComponent from './Charts-Components/AreaChartComponent';
import BarChartComponent from './Charts-Components/BarChartComponent';
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
        this.DBAccess.getStatisticsForYear(2019)
        .then((result)=>{
            let areaChartsResult = result.slice(0,4);
            let barChartResult = result.slice(4,6);
            let areaChartsParsedData = this.dataParser.parseDataForLineCharts(areaChartsResult);
            this.setState({
                areaChartsData: areaChartsParsedData,
                barChartsData: barChartResult
            });
        })
        .catch(error=>{
            this.setState({
                areaChartsData: [],
                barChartsData: []
            });
        })
    }
    
    render(){
        const {areaChartsData,barChartsData} = this.state;
       
        if (!areaChartsData||!barChartsData) {
            return (
                <div><h3>Loading data...</h3></div>
            )
        }
        else if (areaChartsData.length === 0 || barChartsData === 0){
            return (
                <div><h3>Statistics cannot be displayed.</h3></div>
            )
        }
        let mlServices = barChartsData[0];
        console.log(Object.keys(mlServices)[0])
        return(
            <div>
                <AreaChartComponent 
                    chartsData={[areaChartsData[0],areaChartsData[1]]} 
                    areaFillColor={"#0734ff"} 
                    areaStrokeColor={"#0734ff"} 
                    linearGradientId="firstAreaChart"
                />
                <AreaChartComponent 
                    chartsData={[areaChartsData[2],areaChartsData[3]]} 
                    areaFillColor={"#0289ff"} 
                    areaStrokeColor={"#0289ff"} 
                    linearGradientId="secondAreaChart"
                />
                <BarChartComponent chartsData={barChartsData[0]} barStrokeColor={"#ff11fb"}/>
                <BarChartComponent chartsData={barChartsData[1]} barStrokeColor={"#fff311"}/>
            </div>
        )
    }
}

export default Statistics;