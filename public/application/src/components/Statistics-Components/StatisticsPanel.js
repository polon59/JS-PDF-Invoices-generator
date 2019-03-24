import React, { Component } from 'react';
import Statistics from './Statistics';
import WrongFetchData from './Wrong-Stats-Data-Components/WrongFetchData';

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

        changeYear = () =>{
            this.setState({
                year: this.state.years[0].year
            });
        }

        render(){
            const {year,years} = this.state;
            if(!years){
                return(<WrongFetchData reason={'stillLoading'}/>)
            }
            if(years.length<1){
                return(<WrongFetchData reason={'empty'}/>)
            }
            if (!year){
                return(
                    <div>
                        <h3>No year selected</h3>
                        <p>{JSON.stringify(years)}</p>
                        <button onClick={()=>{this.changeYear()}}>set year = 2019</button>
                    </div>
                )
            }
            return(
                <div>
                    <h3>HEADER FROM PANEL</h3>
                    <h3>{this.state.year}</h3>
                    <button onClick={()=>{this.changeYear()}}>set year = 2019</button>
                    <Statistics DBAccess={this.DBAccess} year={year}/>
                </div>
            )
        }
    }
    
    export default StatisticsPanel;