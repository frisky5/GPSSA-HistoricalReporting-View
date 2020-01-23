import React, { PureComponent } from "react";
import moment from "moment";
import momentDurationPlugin from "moment-duration-format";
momentDurationPlugin(moment);
class GraphicalReportsDataGetter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      agents: [],
      prevStartTime: "",
      prevStopTime: "",
      newStartTime: "",
      newStopTime: ""
    };
    this.getCircularBarChartReportData = this.getCircularBarChartReportData.bind(
      this
    );
    this.getAgentsPerformanceBarChartReportData = this.getAgentsPerformanceBarChartReportData.bind(
      this
    );

    this.setRunState = this.setRunState.bind(this);
  }
  componentDidMount() {
    fetch("http://10.10.60.67/historicalreporting/getAgents", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          var tempAgents = [];
          for (var looper = 0; looper < json.length; looper++) {
            tempAgents.push({
              label: json[looper].agentName,
              value: json[looper].agentId
            });
          }

          this.setState({ agents: tempAgents });
        });
      }
    });
  }
  setRunState() {
    this.props.setRun();
  }
  getCircularBarChartReportData() {
    this.props.setCircularBarChartData([]);
    fetch("http://10.10.60.67/historicalreporting/summaryReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        startDateTime: this.props.startTime.format("YYYY-MM-DD HH:mm:ss"),
        endDateTime: this.props.stopTime.format("YYYY-MM-DD HH:mm:ss")
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          var temp = [];
          temp.push({
            name: "Complaint English Call",
            uv: json.totalCallsOfComplaintsEnglish,
            pv: json.totalNumberOfAllCalls,
            fill: "#a7414a"
          });
          temp.push({
            name: "General English Calls",
            uv: +json.totalCallsOfGeneralEnglish,
            pv: json.totalNumberOfAllCalls,
            fill: "#6a8a82"
          });
          temp.push({
            name: "Complain Arabic Calls",
            uv: json.totalCallsOfComplaintsArabic,
            pv: json.totalNumberOfAllCalls,
            fill: "#f49f05"
          });
          temp.push({
            name: "General Arabic Calls",
            uv: +json.totalCallsOfGeneralArabic,
            pv: json.totalNumberOfAllCalls,
            fill: "#f3cd05"
          });
          temp.push({
            name: "IVR Calls",
            uv: json.numberOfIvrCalls,
            pv: json.totalNumberOfAllCalls,
            fill: "#0aaff1"
          });
          temp.push({
            name: "All Calls",
            uv: json.totalNumberOfAllCalls,
            pv: json.totalNumberOfAllCalls,
            fill: "#36688d"
          });
          this.props.setCircularBarChartData(temp);
        });
      }
    });
  }

  getAgentsPerformanceBarChartReportData() {
    this.props.setBarChartData([]);
    var selectedAgents = [];
    for (var looper = 0; looper < this.state.agents.length; looper++) {
      selectedAgents.push(this.state.agents[looper].value);
    }
    fetch("http://10.10.60.67/historicalreporting/agentPerformance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        startDateTime: this.props.startTime.format("YYYY-MM-DD"),
        endDateTime: this.props.stopTime.format("YYYY-MM-DD"),
        agents: selectedAgents
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          var agentPerformanceBarChartData = [];
          json.forEach(element => {
            for (var looper = 0; looper < this.state.agents.length; looper++) {
              if (element.agentID == this.state.agents[looper].value) {
                element.agentID = this.state.agents[looper].label;
              }
            }
          });
          var looper = 0;
          for (looper = 0; looper < json.length; looper++) {
            json[looper].totalTalkTimeByAgent = moment
              .duration(parseInt(json[looper].totalTalkTimeByAgent), "seconds")
              .format("hh:mm:ss", { trim: false });

            json[looper].totalAuxTimeByAgent = moment
              .duration(parseInt(json[looper].totalAuxTimeByAgent), "seconds")
              .format("hh:mm:ss", { trim: false });

            json[looper].totalAcwByAgent = moment
              .duration(parseInt(json[looper].totalAcwByAgent), "seconds")
              .format("hh:mm:ss", { trim: false });
          }

          for (looper = 0; looper < json.length; looper++) {
            agentPerformanceBarChartData.push({
              name: json[looper].agentID,
              "Calls Received": +json[looper].numberOfCallsReceivedByAgent,
              "Calls Abandoned": +json[looper].totalAbandonedCallByAgent,
              "Total Calls":
                +json[looper].numberOfCallsReceivedByAgent +
                +json[looper].totalAbandonedCallByAgent
            });
          }
          this.props.setBarChartData(agentPerformanceBarChartData);
        });
      }
    });
  }
  render() {
    var flag = false;
    if (this.props.run) {
      flag = true;
    } else {
      return <br />;
    }
    if (flag) {
      this.setRunState();
      this.getCircularBarChartReportData();
      this.getAgentsPerformanceBarChartReportData();
      return <br />;
    }
  }
}

export default GraphicalReportsDataGetter;
