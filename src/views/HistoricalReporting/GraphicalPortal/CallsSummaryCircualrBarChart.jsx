import React, { Component,PureComponent } from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip } from "recharts";
import moment from "moment";
import momentDurationPlugin from "moment-duration-format";
momentDurationPlugin(moment);

const style = {
  top: 100,
  left: 400,
  lineHeight: "24px"
};

class CallsSummaryCircualrBarChart extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.run != true) return <br />;

    return (
      <RadialBarChart
        width={500}
        height={500}
        cx={200}
        cy={200}
        innerRadius={20}
        outerRadius={180}
        barSize={20}
        data={this.props.data}
      >
        <RadialBar
          minAngle={0}
          label={{ position: "insideStart", fill: "#000" }}
          background
          clockWise={false}
          dataKey="uv"
          domainKey="pv"
        />
        <Legend
          iconSize={10}
          width={300}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
        <Tooltip />
      </RadialBarChart>
    );
  }
}

export default CallsSummaryCircualrBarChart;
