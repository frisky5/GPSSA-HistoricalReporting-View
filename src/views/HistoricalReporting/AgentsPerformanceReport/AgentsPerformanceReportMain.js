import React, { Component, useState } from "react";
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
  Row
} from "reactstrap";
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import { CSVLink, CSVDownload } from "react-csv";
import "rc-datetime-picker/dist/picker.css";
import BootstrapTable from "react-bootstrap-table-next";
import momentDurationPlugin from "moment-duration-format";
import MultiSelect from "react-multi-select-component";
momentDurationPlugin(moment);

class AgentsPerformanceReportMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonContent: "Run!",
      agentDropDownIsOpen: false,
      finalDispositionDropDownIsOpen: false,
      agentDropdownValue: "All Agents",
      finalDispositionDropDownValue: "Please Select",
      startDate: moment(),
      stopDate: moment(),
      collapse: false,
      Entering: "Loading...",
      Entered: "Loaded...",
      Exiting: "Exiting...",
      Exited: "Exited...",
      options: [
        { label: "Grapes", value: "grapes" },
        { label: "Mangos", value: "mango" },
        { label: "Strawberry", value: "strawberry" }
      ],
      records: [],
      agents: [],
      selectedAgents: [],
      columns: [
        {
          dataField: "agentID",
          text: "Agent Name",
          headerAlign: "left",
          align: "left",
          headerTitle: true
        },
        {
          dataField: "numberOfCallsReceivedByAgent",
          text: "No. of Calls Received",
          sort: true,
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "totalTalkTimeByAgent",
          text: "Total Talk Time",
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "totalAuxTimeByAgent",
          text: "Total Aux Time",
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "totalAcwByAgent",
          text: "Total ACW",
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "totalAbandonedCallByAgent",
          text: "Total Abandoned Calls",
          headerAlign: "left",
          align: "left"
        }
      ],
      csvHeaders: [
        { label: "Agent Name", key: "agentID" },
        { label: "No. of Calls Received", key: "numberOfCallsReceivedByAgent" },
        { label: "Total Talk Time", key: "totalTalkTimeByAgent" },
        { label: "Total Aux Time", key: "totalAuxTimeByAgent" },
        { label: "Total ACW", key: "totalAcwByAgent" },
        { label: "Total Abandoned Calls", key: "totalAbandonedCallByAgent" }
      ],
      exportAsCsvLink: "",
      selectedAllAgents: false
    };
    this.toggle = this.toggle.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
    this.setagentDropdownValue = this.setagentDropdownValue.bind(this);
    this.setFinalDispositionDropDownValue = this.setFinalDispositionDropDownValue.bind(
      this
    );
    this.agentToggleDropDown = this.agentToggleDropDown.bind(this);
    this.finalDispositionToggleDropDown = this.finalDispositionToggleDropDown.bind(
      this
    );
    this.onEntered = this.onEntered.bind(this);
    this.onExited = this.onExited.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onExiting = this.onExiting.bind(this);
    
    this.selectAgentEvent = this.selectAgentEvent.bind(this);
    this.getAgentPerformanceReport = this.getAgentPerformanceReport.bind(this);
    this.onChangeAgentSelect = this.onChangeAgentSelect.bind(this);
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

  selectAgentEvent(selectedAgent) {
    if (selectedAgent == "All Agents") {
      this.setState({ selectedAllAgents: !this.state.selectedAllAgents });
    }
    var agents = this.state.agents;
    for (var looper = 0; looper < this.state.agents.length; looper++) {
      if (agents[looper].agentId == selectedAgent) {
        agents[looper].selected = !agents[looper].selected;
      }
    }
    this.setState({ agents: agents });
  }

  agentToggleDropDown() {
    this.setState({
      agentDropDownIsOpen: !this.state.agentDropDownIsOpen
    });
  }
  finalDispositionToggleDropDown() {
    this.setState({
      finalDispositionDropDownIsOpen: !this.state.finalDispositionDropDownIsOpen
    });
  }

  setagentDropdownValue = event => {
    this.setState({ agentDropdownValue: event.target.innerHTML });
  };

  setFinalDispositionDropDownValue = event => {
    this.setState({ finalDispositionDropDownValue: event.target.innerHTML });
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

  getAgentPerformanceReport() {
    const tempstart = this.state.startDate.format("YYYY-MM-DD");
    const tempstop = this.state.stopDate.format("YYYY-MM-DD");
    var selectedAgents = [];
    if (this.state.selectedAgents.length == 0) {
      return;
    }
    for (var looper = 0; looper < this.state.selectedAgents.length; looper++) {
      selectedAgents.push(this.state.selectedAgents[looper].value);
    }

    fetch("http://10.10.60.67/historicalreporting/agentPerformance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        startDateTime: tempstart,
        endDateTime: tempstop,
        agents: selectedAgents
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
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
          this.setState({ records: json });
          
          this.setState({
            exportAsCsvLink: (
              <CSVLink
                filename={
                  "Agent Performance Report " +
                  this.state.startDate.format("YYYY-MM-DD") +
                  " to " +
                  this.state.stopDate.format("YYYY-MM-DD") +
                  ".csv"
                }
                data={this.state.records}
                headers={this.state.csvHeaders}
              >
                Download
              </CSVLink>
            )
          });
        });
      }
    });
  }
  toggle() {
    if (this.state.collapse == false) {
      this.setState({
        collapse: !this.state.collapse
      });
      this.getAgentPerformanceReport();
    } else {
      this.getAgentPerformanceReport();
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
                      placeholder="Normal"
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
                      placeholder="Normal"
                    />
                  </DatetimePickerTrigger>
                  <FormText className="help-block">
                    Please select end date & time
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
                <FormGroup>{this.state.exportAsCsvLink}</FormGroup>
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
                    keyField="agentID"
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

export default AgentsPerformanceReportMain;
