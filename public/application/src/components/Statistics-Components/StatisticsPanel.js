import React, { Component } from 'react';
import Statistics from './Statistics';
import WrongFetchData from './Wrong-Stats-Data-Components/WrongFetchData';
import DialogSelect from '../common/DialogSelect';

class StatisticsPanel extends Component{
    
        constructor(props){
            super();
            this.DBAccess = props.DBAccess;
            this.state = {
                year : undefined,
                years : undefined
            }
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

        render(){
            const {year,years} = this.state;
            if(!years){
                return(<WrongFetchData reason={'stillLoading'}/>)
            }
            else if(years.length<1){
                return(<WrongFetchData reason={'empty'}/>)
            }
            else if (!year){
                return(
                    <div>
                        <h3>No year selected</h3>
                        <DialogSelect 
                            options={this.prepareYearsList()} 
                            title="Select year" 
                            handleSubmit={this.changeYear}
                        />
                    </div>
                )
            }
            return(
                <div>
                    <h3>Selected year {this.state.year}</h3>
                    <DialogSelect 
                        options={this.prepareYearsList()} 
                        title="Select year" 
                        handleSubmit={this.changeYear}
                    />
                    <Statistics DBAccess={this.DBAccess} year={this.state.year}/>
                </div>
            )
        }
    }
    
    export default StatisticsPanel;