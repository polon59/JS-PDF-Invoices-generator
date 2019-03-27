import React, { Component } from 'react'
import AreaChartComponent from './Charts-Components/AreaChartComponent';
import BarChartComponent from './Charts-Components/BarChartComponent';
import StatisticsDataParser from './data-parser/DataParser';
import StillLoading from './Wrong-Stats-Data-Components/StillLoading';
import EmptyDataMessage from './Wrong-Stats-Data-Components/EmptyDataMessage';
import FetchErrorMessage from './Wrong-Stats-Data-Components/FetchErrorMessage';
import Grid from '@material-ui/core/Grid';


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

    fetchStatisticsData = (year) =>{
        this.DBAccess.getStatisticsForYear(year)
        .then((result)=>{this.setDataFromFetch(result);})
        .catch(error=>{this.handleFetchError();})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.year !== this.state.year) {
          this.setState({
            year: nextProps.year,
          });
          this.fetchStatisticsData(nextProps.year);
        }
    }

    componentWillMount() {
        const {year} = this.props;
        this.fetchStatisticsData(year);
    }

    render(){
        const {areaChartsData,barChartsData,fetchData} = this.state;

        if (this.isDataStillLoading()) {
            return (
                <StillLoading/>
            )
        }
        else if (this.hasFetchErrorOcured()){
            return (
                <FetchErrorMessage/>
            )
        }
        else if (this.isFetchDataEmpty(fetchData)){
            return (
                <EmptyDataMessage reason='noServices'/>
            )
        }
        return(
            <div>
                <AreaChartComponent 
                    year={this.props.year}
                    chartTitle="Performance in"
                    chartsData={[areaChartsData[0],areaChartsData[1]]} 
                    areaFillColor={"#0734ff"} 
                    areaStrokeColor={"#0734ff"} 
                    linearGradientId="firstAreaChart"
                />
                <AreaChartComponent 
                    year={this.props.year}
                    chartTitle="Income in"
                    chartsData={[areaChartsData[2],areaChartsData[3]]} 
                    areaFillColor={"#0289ff"} 
                    areaStrokeColor={"#0289ff"} 
                    linearGradientId="secondAreaChart"
                />

                <Grid container spacing={24}>
                    <Grid item sm={6} xs={12}>
                        <BarChartComponent 
                          chartTitle={`Most lucrative services in ${this.props.year}`}
                          chartsData={barChartsData[0]} 
                          barStrokeColor={"#ff11fb"}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <BarChartComponent 
                          chartTitle={`Best customers in ${this.props.year}`}
                          chartsData={barChartsData[1]} 
                          barStrokeColor={"#fff311"}
                        />
                    </Grid>
                </Grid>
                
                
            </div>
        )
    }
}

export default Statistics;