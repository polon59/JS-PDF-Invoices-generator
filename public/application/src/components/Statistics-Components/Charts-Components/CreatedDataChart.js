import React, { PureComponent } from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { curveCardinal } from 'd3-shape';

class CreatedDataChart extends PureComponent{

    constructor(props){
        super();
        this.DBAccess = props.DBAccess;
        this.state = {
          currentChartData : [
            {
              name: 'Page A', uv: 4000,
            },
            {
              name: 'Page B', uv: 3000,
            },
            {
              name: 'Page C', uv: 2000,
            },
            {
              name: 'Page D', uv: 2780,
            },
            {
              name: 'Page E', uv: 1890,
            },
            {
              name: 'Page F', uv: 2390,
            },
            {
              name: 'Page G', uv: 3490,
            },
          ]
        }
        this.cardinal = curveCardinal.tension(0.4);
    }

    handleDataChange =() =>{
      this.setState({
        currentChartData :[
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
           <div style={{ width: '100%', height: 300 }}>
            <button onClick={this.handleDataChange}>changedata</button>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={this.state.currentChartData}
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
            </ResponsiveContainer>
          </div>
        );
      }
    
}

export default CreatedDataChart;