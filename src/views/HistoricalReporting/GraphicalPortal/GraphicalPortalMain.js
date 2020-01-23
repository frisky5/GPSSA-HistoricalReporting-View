import React, { Component } from "react";
import {
  Col,
  Row,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  CardBody,
  CardHeader,
  Label
} from "reactstrap";
import CallsSummaryCircualrBarChart from "./CallsSummaryCircualrBarChart.jsx";
import GraphicalPortalFields from "./GraphicalPortalFields";
import AgentPerformanceBarChart from "./AgentPerformanceBarChart.jsx";
import GraphicalReportsDataGetter from "./GraphicalReportsDataGetter.jsx";
import moment from "moment";
import momentDurationPlugin from "moment-duration-format";
momentDurationPlugin(moment);

class GraphicalPortalMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportTypeDropdownIsOpen: false,
      reportTypeDropdownValue: "Select a report",
      callsSummaryFieldsVisibility: "false",
      callsSummaryGraphsVisibility: "false",
      callsSummaryReportData: [],
      agentPerformanceBarChart: [],
      agentPerformanceVisibility: "false",
      runCallsSummaryCircularBarChart: false,
      runAgentPerformanceBarChart: "false",
      startTime: moment(),
      stopTime: moment(),
      circularBarChartData: [],
      barChartData: [],
      getReportsDataRunFlag: false
    };
    this.setReportTypeDropdownValue = this.setReportTypeDropdownValue.bind(
      this
    );
    this.reportTypeToggleDropdown = this.reportTypeToggleDropdown.bind(this);
    this.setCircularBarChartData = this.setCircularBarChartData.bind(this);
    this.setBarChartData = this.setBarChartData.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setStopTime = this.setStopTime.bind(this);
    this.runReports = this.runReports.bind(this);
    this.setReportsDataRunFlag = this.setReportsDataRunFlag.bind(this);
  }

  reportTypeToggleDropdown() {
    this.setState({
      reportTypeDropdownIsOpen: !this.state.reportTypeDropdownIsOpen
    });
  }
  setReportTypeDropdownValue = event => {
    this.setState({ reportTypeDropdownValue: event.target.innerHTML });
  };
  setStartTime(_startTime) {
    this.setState({ startTime: _startTime });
  }
  setStopTime(_stopTime) {
    this.setState({ stopTime: _stopTime });
  }
  runReports() {
    this.setState({ getReportsDataRunFlag: true });
  }
  setCircularBarChartData(temp) {
    this.setState({ circularBarChartData: temp });
    this.setState({ runCallsSummaryCircularBarChart: true });
    this.setState({ runAgentPerformanceBarChart: true });
  }
  setBarChartData(temp) {
    this.setState({ barChartData: temp });
    this.setState({ runAgentPerformanceBarChart: true });
  }
  setReportsDataRunFlag() {
    this.setState({ getReportsDataRunFlag: false });
  }
  render() {
    return (
      <Row className="animated fadeIn">
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <Card>
            <CardHeader>
              Please Choose a report & fill its corresponding field!
            </CardHeader>
            <CardBody>
              <Row>
                <GraphicalPortalFields
                  startTime={this.setStartTime}
                  stopTime={this.setStopTime}
                  run={this.runReports}
                />
              </Row>
              <Row>
                <GraphicalReportsDataGetter
                  run={this.state.getReportsDataRunFlag}
                  setRun={this.setReportsDataRunFlag}
                  setCircularBarChartData={this.setCircularBarChartData}
                  setBarChartData={this.setBarChartData}
                  startTime={this.state.startTime}
                  stopTime={this.state.stopTime}
                />
                <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                  <CallsSummaryCircualrBarChart
                    run={this.state.runCallsSummaryCircularBarChart}
                    data={this.state.circularBarChartData}
                  />
                </Col>
                <Col xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                  <AgentPerformanceBarChart
                    run={this.state.runAgentPerformanceBarChart}
                    data={this.state.barChartData}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default GraphicalPortalMain;
