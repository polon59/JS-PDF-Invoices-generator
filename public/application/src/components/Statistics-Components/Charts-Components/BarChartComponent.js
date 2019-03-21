import React, { PureComponent } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

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
        <XAxis dataKey={Object.keys(chartsData[0])[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={Object.keys(chartsData[0])[1]} fill="#8884d8" />
      </BarChart>
    );
  }
}

export default BarChartComponent;