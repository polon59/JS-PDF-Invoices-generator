import React, { Component } from 'react';
import Statistics from './Statistics';
import NoYearSelectedMessage from './Wrong-Stats-Data-Components/NoYearSelectedMessage';
import StillLoading from './Wrong-Stats-Data-Components/StillLoading';
import EmptyDataMessage from './Wrong-Stats-Data-Components/EmptyDataMessage';
import FetchErrorMessage from './Wrong-Stats-Data-Components/FetchErrorMessage';
import StatisticsAppBar from './StatisticsAppBar';

class StatisticsPanel extends Component{
    
        constructor(props){
            super();
            this.DBAccess = props.DBAccess;
            this.state = {
                year : undefined,
                years : undefined
            }
        }

        handleFetchError = () =>{
            this.setState({
                years: "ERR"
            });
        }
    
        componentWillMount() {
            this.DBAccess.getAvailableYears()
            .then((result)=>{
                this.setState({
                    years: result
                });
            })
            .catch(error=>{this.handleFetchError();})
        }

        changeYear = (selection) =>{
            this.setState({
                year: selection
            });
        }

        prepareYearsList = () =>{
            const {years} = this.state;
            return years.map(element =>{
                return element.year;
            })
        }

        renderPanelContent(){
            const {year,years} = this.state;
            if(!years){
                return(<StillLoading/>)
            }
            else if(years==="ERR"){
                return(<FetchErrorMessage/>)
            }
            else if(years.length<1){
                return(<EmptyDataMessage reason='noInvoices'/>)
            }
            else if (!year){
                return(
                    <div>
                        <StatisticsAppBar 
                            title="No year selected"
                            dialogSelectTitle="Select year"
                            changeYear={this.changeYear}
                            prepareYearsList={this.prepareYearsList}
                        />
                        <NoYearSelectedMessage/>
                    </div>
                )
            }
            return(
                <div>
                    <StatisticsAppBar 
                        title={`Selected year: ${this.state.year}`}
                        dialogSelectTitle="Change year"
                        changeYear={this.changeYear}
                        prepareYearsList={this.prepareYearsList}
                    />
                    <Statistics DBAccess={this.DBAccess} year={this.state.year}/>
                </div>
            )
        }

        render(){
            return(
                <div className="bordered">
                    <h3>Statistics</h3>
                    <p>image here and other stuff</p>
                    {this.renderPanelContent()}
                </div>
            )
        }
    }
    
    export default StatisticsPanel;