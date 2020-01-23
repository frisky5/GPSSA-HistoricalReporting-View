import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";
class SurveyRadarChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.run != true) return <br />;
    return (
      <RadarChart
        cx={300}
        cy={250}
        outerRadius={150}
        width={500}
        height={500}
        data={this.props.data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="rate" />
        <PolarRadiusAxis />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    );
  }
}
export default SurveyRadarChart;
