import React, { PureComponent } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

class BarChartComponent extends PureComponent {
    constructor(props){
        super();
        this.dataDescription = Object.keys(props.chartsData)[0]
        this.state = {
          chartsData : props.chartsData[this.dataDescription]
        }
    }

  render() {
      const {chartsData} = this.state;
      const {barStrokeColor} = this.props;
    return (
      <BarChart
        width={500}
        height={300}
        data={chartsData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={Object.keys(chartsData[0])[0]}/>
        <YAxis />
        <Tooltip itemStyle={{color:"#232321"}}/>
        <Bar dataKey={Object.keys(chartsData[0])[1]} fill="#5a5a5a2e" stroke={barStrokeColor} />
      </BarChart>
    );
  }
}

export default BarChartComponent;