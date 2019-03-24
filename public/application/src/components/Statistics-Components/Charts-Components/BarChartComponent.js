import React, { PureComponent } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

class BarChartComponent extends PureComponent {
    constructor(props){
        super();
        this.dataDescription = Object.keys(props.chartsData)[0]
        this.state = {
          chartsData : props.chartsData[this.dataDescription]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chartsData !== this.state.chartsData) {
          this.setState({
            chartsData: nextProps.chartsData[this.dataDescription]
          });
        }
        }

    formatXAxisTicks = (tick) =>{
        return `${tick.slice(0,4)}...`;
    }

  render() {
      const {chartsData} = this.state;
      const {barStrokeColor} = this.props;

    return (
    <div className='bordered'>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    height={300}
                    data={chartsData}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid stroke="#696a72" opacity={0.3} strokeDasharray="3 3" />
                    <XAxis dataKey={Object.keys(chartsData[0])[0]} tick={true} tickFormatter={(tick)=>{return this.formatXAxisTicks(tick)}}/>
                    <YAxis />
                    <Tooltip itemStyle={{color:"#232321"}}/>
                    <Bar dataKey={Object.keys(chartsData[0])[1]} barSize={20} fill="#00000000" stroke={barStrokeColor} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
    );
  }
}

export default BarChartComponent;