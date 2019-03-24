import React, { PureComponent } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { curveCardinal } from 'd3-shape';

class AreaChartComponent extends PureComponent{

    constructor(props){
        super();
        this.cardinal = curveCardinal.tension(0.4);
        this.state = {
          chartTitle : props.chartTitle,
          year : props.year,
          chartsData : props.chartsData,
          currentChartData : props.chartsData[0],
          areaStrokeColor : props.areaStrokeColor,
          areaFillColor : props.areaFillColor,
          linearGradientId : props.linearGradientId

        }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.chartsData !== this.state.chartsData) {
        console.log(nextProps.chartsData)
        this.setState({
          chartTitle : nextProps.chartTitle,
          year: nextProps.year,
          chartsData: nextProps.chartsData, 
          currentChartData : nextProps.chartsData[0],
          areaStrokeColor : nextProps.areaStrokeColor,
          areaFillColor : nextProps.areaFillColor,
          linearGradientId : nextProps.linearGradientId
        });
      }
      }

    handleDataChange =(dataSet) =>{
      this.setState({
        currentChartData : this.state.chartsData[dataSet]
      });
    }

      render() {
        const {currentChartData,year,chartTitle,chartsData, areaStrokeColor, areaFillColor, linearGradientId} = this.state;
        // const {areaStrokeColor, areaFillColor, linearGradientId} = this.props
        
        return (
          <div className='bordered'>
            <h3>{chartTitle} {year}</h3>
          <h4>{Object.keys(currentChartData[0])[1]}</h4>
            <button onClick={()=>{this.handleDataChange(0)}}>{Object.keys(chartsData[0][0])[1]}</button>
            <button onClick={()=>{this.handleDataChange(1)}}>{Object.keys(chartsData[1][0])[1]}</button>
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
              <defs>
              <linearGradient id={linearGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={areaFillColor} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={areaFillColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
                <CartesianGrid horizontal={false} stroke="#696a72" opacity={0.3}  />
                <XAxis dataKey= {Object.keys(currentChartData[0])[0]}/>
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={Object.keys(currentChartData[0])[1]} stroke={areaStrokeColor} fill={`url(#${linearGradientId})`} fillOpacity={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          </div> 
        );
      }
    
}

export default AreaChartComponent;