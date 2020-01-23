import React, { Component } from "react";
import { css } from "@emotion/core";
import { DotLoader } from "react-spinners";
import Spacer from "react-spacer";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  FormGroup,
  FormText,
  Input,
  Label,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from "reactstrap";
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import MultiSelect from "react-multi-select-component";
import "rc-datetime-picker/dist/picker.css";
import BootstrapTable from "react-bootstrap-table-next";
import { CSVLink, CSVDownload } from "react-csv";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class SurveyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonContent: "Run!",
      surevyTypeDropdownIsOpen: false,
      finalDispositionDropDownIsOpen: false,
      surveyTypeDropdownValue: "Inbound",
      finalDispositionDropDownValue: "Please Select",
      agentDropdownValue: "All Agents",
      startDate: moment(),
      stopDate: moment(),
      collapse: false,
      Entering: "Loading...",
      Entered: "Loaded...",
      Exiting: "Exiting...",
      Exited: "Exited...",
      records: [],
      agents: [],
      columns: [{}],
      selectedAgents: [],
      csvHeadersInbound: [
        { label: "Caller Number", key: "callerNumber" },
        { label: "Timestamp", key: "callDateTime" },
        { label: "Agent", key: "agentID" },
        { label: "Problem Solved?", key: "q1Answer" },
        { label: "Reason", key: "q2Answer" },
        { label: "Evaluation", key: "evaluation" },
        { label: "Language", key: "language" }
      ],
      csvHeadersOutbound: [
        { label: "Client Number", key: "customerNumber" },
        { label: "Timestamp", key: "timestamp" },
        { label: "CC Satisfaction", key: "q1" },
        { label: "Agent Morals", key: "q2" },
        { label: "CHC", key: "q3" },
        { label: "IVR Satisfaction", key: "q4" },
        { label: "Service Response Time", key: "q5" },
        { label: "Evluation", key: "evaluation" },
        { label: "Language", key: "language" }
      ],
      exportAsCsvLink: ""
    };
    this.toggle = this.toggle.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
    this.setsurveyTypeDropdownValue = this.setsurveyTypeDropdownValue.bind(
      this
    );
    this.surveyTypeToggleDropdown = this.surveyTypeToggleDropdown.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExited = this.onExited.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onChangeAgentSelect = this.onChangeAgentSelect.bind(this);
    this.renderCsvLink = this.renderCsvLink.bind(this);
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
        var tempAgents = [];
        response.json().then(json => {
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
  agentToggleDropDown() {
    this.setState({
      agentDropDownIsOpen: !this.state.agentDropDownIsOpen
    });
  }
  setagentDropdownValue = event => {
    this.setState({ agentDropdownValue: event.target.innerHTML });
  };

  surveyTypeToggleDropdown() {
    this.setState({
      surevyTypeDropdownIsOpen: !this.state.surevyTypeDropdownIsOpen
    });
  }

  setsurveyTypeDropdownValue = event => {
    this.setState({ surveyTypeDropdownValue: event.target.innerHTML });
  };

  onStartDateChange = startDate => {
    this.setState({
      startDate
    });
  };
  onStopDateChange = stopDate => {
    this.setState({
      stopDate
    });
  };

  renderCsvLink() {
    if (this.state.records.length <= 0) {
      return "";
    } else if (this.state.surveyTypeDropdownValue == "Inbound") {
      return (
        <CSVLink
          filename={
            "Inbound Survey Report " +
            this.state.startDate.format("YYYY-MM-DD") +
            " to " +
            this.state.stopDate.format("YYYY-MM-DD") +
            ".csv"
          }
          data={this.state.records}
          headers={this.state.csvHeadersInbound}
        >
          Download
        </CSVLink>
      );
    } else if (this.state.surveyTypeDropdownValue == "Outbound")
      return (
        <CSVLink
          filename={
            "Outbound Survey Report " +
            this.state.startDate.format("YYYY-MM-DD") +
            " to " +
            this.state.stopDate.format("YYYY-MM-DD") +
            ".csv"
          }
          data={this.state.records}
          headers={this.state.csvHeadersOutbound}
        >
          Download
        </CSVLink>
      );
  }
  getSurveyData() {
    if (this.state.surveyTypeDropdownValue == "Inbound") {
      this.setState({
        columns: [
          {
            dataField: "callerNumber",
            text: "Caller Number",
            headerAlign: "left",
            align: "left",
            headerTitle: true
          },
          {
            dataField: "callDateTime",
            text: "Call Timestamp",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "agentID",
            text: "Agent",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q1Answer",
            text: "Problem Solved ?",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q2Answer",
            text: "Reason",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "evaluation",
            text: "Evaluation",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "language",
            text: "Language",
            headerAlign: "left",
            align: "left"
          }
        ]
      });
    } else if (this.state.surveyTypeDropdownValue == "Outbound") {
      this.setState({
        columns: [
          {
            dataField: "customerNumber",
            text: "Caller Number",
            headerAlign: "left",
            align: "left",
            headerTitle: true
          },
          {
            dataField: "timestamp",
            text: "Call Timestamp",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q1",
            text: "CC Satisfaction",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q2",
            text: "Agent Morals",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q3",
            text: "CHC",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q4",
            text: "IVR Satisfaction",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "q5",
            text: "Service Response Time",
            headerAlign: "left",
            align: "left"
          },
          {
            dataField: "evaluation",
            text: "Evaluation",
            headerAlign: "left",
            align: "left"
          },
          ,
          {
            dataField: "language",
            text: "Language",
            headerAlign: "left",
            align: "left"
          }
        ]
      });
    }
    this.setState({ records: [] });
    if (this.state.surveyTypeDropdownValue == "Inbound") {
    }
    const tempstart = this.state.startDate.format("YYYY-MM-DD");
    const tempstop = this.state.stopDate.format("YYYY-MM-DD");
    var tempAgents = [];
    if (
      this.state.surveyTypeDropdownValue == "Inbound" &&
      this.state.selectedAgents.length <= 0
    ) {
      return;
    } else if (this.state.surveyTypeDropdownValue == "Inbound")
      for (
        var looper = 0;
        looper < this.state.selectedAgents.length;
        looper++
      ) {
        tempAgents.push(this.state.selectedAgents[looper].value);
      }
    else if (this.state.surveyTypeDropdownValue == "Outbound") {
      tempAgents = [];
    }
    fetch("http://10.10.60.67/historicalreporting/getSurveyReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        startDateTime: tempstart,
        endDateTime: tempstop,
        agentID: tempAgents,
        surveyType: this.state.surveyTypeDropdownValue
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          if (this.state.surveyTypeDropdownValue == "Inbound") {
            for (var looper = 0; looper < json.length; looper++) {
              for (
                var innerLooper = 0;
                innerLooper < this.state.agents.length;
                innerLooper++
              ) {
                if (
                  json[looper].agentID == this.state.agents[innerLooper].value
                )
                  json[looper].agentID = this.state.agents[innerLooper].label;
              }
            }
          } else if (this.state.surveyTypeDropdownValue == "Outbound") {
            for (var looper = 0; looper < json.length; looper++) {
              var sum =
                +json[looper].q1 +
                +json[looper].q2 +
                +json[looper].q3 +
                +json[looper].q4 +
                +json[looper].q5;
              json[looper].evaluation = sum / 5;
            }
          }
          for (var looper = 0; looper < json.length; looper++) {
            if (json[looper].language == "A" || json[looper].language == "a") {
              json[looper].language = "Arabic";
            } else if (
              json[looper].language == "E" ||
              json[looper].language == "e"
            ) {
              json[looper].language = "English";
            }
          }
          this.setState({ records: json });
        });
      }
    });
  }
  toggle() {
    if (this.state.collapse == false) {
      this.setState({
        collapse: !this.state.collapse
      });
      this.getSurveyData();
    } else {
      this.getSurveyData();
    }
  }
  onEntering() {}
  onEntered() {}
  onExiting() {}
  onExited() {}
  onChangeAgentSelect(x) {
    this.setState({ selectedAgents: x });
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Please select required values</CardHeader>
          <CardBody>
            <FormGroup row>
              <Col xs="12" sm="12" md="6" lg="4" xl="2">
                <FormGroup>
                  <Label className="h6">Start: </Label>
                  <DatetimePickerTrigger
                    moment={this.state.startDate}
                    onChange={this.onStartDateChange}
                  >
                    <Input
                      type="text"
                      value={this.state.startDate.format("DD/MM/YYYY  hh:mm A")}
                      size="10"
                      placeholder="Normal"
                      readOnly={true}
                    />
                  </DatetimePickerTrigger>
                  <FormText className="help-block">
                    Please select start date & time
                  </FormText>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="4" xl="2">
                <FormGroup>
                  <Label className="h6">End: </Label>
                  <DatetimePickerTrigger
                    moment={this.state.stopDate}
                    onChange={this.onStopDateChange}
                  >
                    <Input
                      type="text"
                      value={this.state.stopDate.format("DD/MM/YYYY  hh:mm A")}
                      size="10"
                      placeholder="Normal"
                      readOnly={true}
                    />
                  </DatetimePickerTrigger>
                  <FormText className="help-block">
                    Please select end date & time
                  </FormText>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="4" xl="2">
                <FormGroup>
                  <Label className="h6">Survey Type: </Label>
                  <Dropdown
                    isOpen={this.state.surevyTypeDropdownIsOpen}
                    toggle={() => {
                      this.surveyTypeToggleDropdown();
                    }}
                  >
                    <DropdownToggle caret size="md" className="btn-block">
                      {this.state.surveyTypeDropdownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.setsurveyTypeDropdownValue}>
                        Inbound
                      </DropdownItem>
                      <DropdownItem onClick={this.setsurveyTypeDropdownValue}>
                        Outbound
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <FormText className="help-block">
                    Please select Survey Type
                  </FormText>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="4" xl="2">
                <FormGroup>
                  <Label className="h6">Select Agent/s: </Label>
                  <MultiSelect
                    options={this.state.agents}
                    value={this.state.selectedAgents}
                    onChange={this.onChangeAgentSelect}
                    labelledBy={"Select Agent/s"}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="3" lg="2" xl="1">
                <FormGroup>
                  <Spacer height="28px" />
                  <Button
                    block
                    color="success"
                    className="btn-pill"
                    onClick={this.toggle}
                  >
                    Run!
                  </Button>
                </FormGroup>
                <FormGroup>{this.renderCsvLink()}</FormGroup>
              </Col>
            </FormGroup>

            <Collapse
              isOpen={this.state.collapse}
              onEntering={this.onEntering}
              onEntered={this.onEntered}
              onExiting={this.onExiting}
              onExited={this.onExited}
              className="animated fadeIn fadeOut"
            >
              <Row>
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <BootstrapTable
                    striped={false}
                    bordered={true}
                    hover={true}
                    rowStyle={{ backgroundColor: "white" }}
                    keyField="callID"
                    data={this.state.records}
                    columns={this.state.columns}
                    condensed={true}
                  />
                </Col>
              </Row>
            </Collapse>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default SurveyReport;
