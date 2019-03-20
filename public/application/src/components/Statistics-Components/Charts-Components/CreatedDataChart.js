import React, { PureComponent } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { curveCardinal } from 'd3-shape';

class CreatedDataChart extends PureComponent{

    constructor(props){
        super();
        this.DBAccess = props.DBAccess;
        this.cardinal = curveCardinal.tension(0.4);
        this.state = {
          currentChartData : props.chartsData[0]
        }
    }

    handleDataChange =(dataSet) =>{
      this.setState({
        currentChartData : this.props.chartsData[dataSet]
      });
    }

      render() {
        const {currentChartData} = this.state;
        
        return (
          <div className='bordered'>
          <h3>{Object.keys(currentChartData[0])[1]}</h3>
            <button onClick={()=>{this.handleDataChange(0)}}>{Object.keys(this.props.chartsData[0][0])[1]}</button>
            <button onClick={()=>{this.handleDataChange(1)}}>{Object.keys(this.props.chartsData[1][0])[1]}</button>
           <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={currentChartData}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
              >
                <CartesianGrid stroke="#696a72" opacity={0.3} strokeDasharray="3 3" />
                <XAxis dataKey= {Object.keys(currentChartData[0])[0]}/>
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={Object.keys(currentChartData[0])[1]} stroke="#18aace" fill="#1d44d1" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          </div>
        );
      }
    
}

export default CreatedDataChart;