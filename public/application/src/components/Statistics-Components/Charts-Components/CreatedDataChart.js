import React, { PureComponent } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,} from 'recharts';
import { curveCardinal } from 'd3-shape';

class CreatedDataChart extends PureComponent{
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xujpnxxp/';

    constructor(props){
        super();
        this.DBAccess = props.DBAccess;
        this.state = {
          data : [
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
          ]
        }
        this.cardinal = curveCardinal.tension(0.4);
    }

    handleDataChange =() =>{
      this.setState({
        data :[
          {
            name: 'Page A', uv: 3,
          },
          {
            name: 'Page B', uv: 2,
          },
          {
            name: 'Page C', uv: 0,
          },
          {
            name: 'Page D', uv: 0,
          },
          {
            name: 'Page E', uv: 5,
          },
          {
            name: 'Page F', uv: 7,
          },
          {
            name: 'Page G', uv: 11,
          },
        ]
      });
    }

      render() {
        return (
          <div>
            <button onClick={this.handleDataChange}>changedata</button>
            <AreaChart
              width={500}
              height={400}
              data={this.state.data}
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              {/* <Area type={this.cardinal} dataKey="uv" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} /> */}
            </AreaChart>
          </div>
        );
      }
    
}

export default CreatedDataChart;