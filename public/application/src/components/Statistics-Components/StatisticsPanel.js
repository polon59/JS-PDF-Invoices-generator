import React, { Component } from 'react';
import Statistics from './Statistics';

class StatisticsPanel extends Component{
    
        constructor(props){
            super();
            this.DBAccess = props.DBAccess;
            this.state = {
                year : undefined
            }
        }
    
        componentWillMount() {

        }

        changeYear = () =>{
            this.setState({
                year: 2019
            });
        }

        render(){
            const {year} = this.state;

            if (!year){
                return(
                    <div>
                        <h3>No year selected</h3>
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