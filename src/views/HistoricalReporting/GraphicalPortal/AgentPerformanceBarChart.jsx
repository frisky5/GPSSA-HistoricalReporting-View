import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
class AgentPerformanceBarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.run != true) return <br />;
    return (
      <BarChart
        width={this.props.data.length * 130}
        height={350}
        data={this.props.data}
        margin={{ top: 70, right: 20, left: 60, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="Total Calls" />
        <Tooltip />
        <Legend />
        <Bar barSize={60} dataKey="Calls Received" stackId="a" fill="#2F9599" />
        <Bar barSize={60} dataKey="Calls Abandoned" stackId="a" fill="#EC2049" />
      </BarChart>
    );
  }
}
export default AgentPerformanceBarChart;
