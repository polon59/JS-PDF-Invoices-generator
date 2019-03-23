import React, { Component } from 'react'
import AreaChartComponent from './Charts-Components/AreaChartComponent';
import BarChartComponent from './Charts-Components/BarChartComponent';
import StatisticsDataParser from './data-parser/DataParser';
import WrongFetchData from './Wrong-Stats-Data-Components/WrongFetchData';

// ADD parent component StatisticsSection with year selector which will render this ons
class Statistics extends Component{

    constructor(props){
        super();
        this.dataParser = new StatisticsDataParser();
        this.DBAccess = props.DBAccess;
        this.state = {
            areaChartsData : null,
            barChartsData : null,
            year : props.year
        }
    }

    handleEmptyDataSetFetch = () =>{
        this.setState({
            areaChartsData: [],
            barChartsData: []
        });
    }

    handleFetchError = () =>{
        this.setState({
            areaChartsData: 'ERR',
            barChartsData: 'ERR'
        });
    }

    setDataFromFetch = (result) =>{
        let barChartResult = result.slice(4,6);
        let areaChartsResult = this.dataParser.parseDataForLineCharts(result.slice(0,4));
        this.setState({
            fetchData: result,
            areaChartsData: areaChartsResult,
            barChartsData: barChartResult,
        });
    }

    isDataStillLoading = () =>{
        const {areaChartsData,barChartsData} = this.state;
        if (!areaChartsData || !barChartsData) {return true}
        return false;
    }

    hasFetchErrorOcured = () =>{
        const {areaChartsData,barChartsData} = this.state;
        if (areaChartsData === 'ERR' || barChartsData === 'ERR') {return true;}
        return false;
    }

    isFetchDataEmpty = (result) =>{
        if (result[1]['Created invoices'].length===0 || result[0]['Done services'].length===0) {
            return true
        }
        return false
    }

    componentWillMount() {
        const {year} = this.state;
        this.DBAccess.getStatisticsForYear(year)
        .then((result)=>{this.setDataFromFetch(result);})
        .catch(error=>{this.handleFetchError();})
    }

    
    render(){
        const {areaChartsData,barChartsData,fetchData} = this.state;

        if (this.isDataStillLoading()) {
            return (
                <WrongFetchData reason={'stillLoading'}/>
            )
        }
        else if (this.hasFetchErrorOcured()){
            return (
                <WrongFetchData reason={'fetchError'}/>
            )
        }
        else if (this.isFetchDataEmpty(fetchData)){
            return (
                <WrongFetchData reason={'empty'}/>
            )
        }
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