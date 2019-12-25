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
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { CSVLink, CSVDownload } from "react-csv";
import moment from "moment";
import momentDurationPlugin from "moment-duration-format";

import { DatetimePickerTrigger } from "rc-datetime-picker";
import "rc-datetime-picker/dist/picker.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import MultiSelect from "react-multi-select-component";
momentDurationPlugin(moment);
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class CallsDetailsReportMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalMessage: "",
      skills: [],
      selectedSkills: [],
      finalDisposition: [
        { label: "Answered", value: "answered" },
        { label: "Abandoned", value: "abandoned" }
      ],
      selectedFinalDisposition: [],
      callType: [
        { label: "IVR Call", value: "ivr" },
        { label: "Normal Call", value: "call" }
      ],
      selectedCallType: [],
      startDate: moment(),
      stopDate: moment(),
      collapse: false,
      Entering: "Loading...",
      Entered: "Loaded...",
      Exiting: "Exiting...",
      Exited: "Exited...",
      records: [],
      agents: [],
      columns: [
        {
          dataField: "callid",
          text: "Call ID"
        },
        {
          dataField: "agentid",
          text: "Agent"
        },
        {
          dataField: "calldatetime",
          text: "Timestamp"
        },
        {
          dataField: "callingnumber",
          text: "Caller No."
        },
        {
          dataField: "ringtime",
          text: "Ringtime"
        },
        {
          dataField: "skillset",
          text: "Skillset"
        },
        {
          dataField: "finaldisposition",
          text: "Disposition"
        },
        {
          dataField: "queuetime",
          text: "Queue Time"
        }
      ],
      csvHeaders: [
        { label: "Call ID", key: "callid" },
        { label: "Agent", key: "agentid" },
        { label: "Timestamp", key: "calldatetime" },
        { label: "Caller Number", key: "callingnumber" },
        { label: "Ringtime", key: "ringtime" },
        { label: "Skillset", key: "skillset" },
        { label: "Final Disposition", key: "finaldisposition" },
        { label: "Queue Time", key: "queuetime" }
      ],
      exportAsCsvLink: "",
      callTypeDropdownIsOpen: false,
      callTypeDropdownValue: "Please Select"
    };
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExited = this.onExited.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onChangeSkillSelect = this.onChangeSkillSelect.bind(this);
    this.onChangeFinalDispositionSelect = this.onChangeFinalDispositionSelect.bind(
      this
    );
    this.onChangeCallTypeSelect = this.onChangeCallTypeSelect.bind(this);
    this.setCallTypeDropdownValue = this.setCallTypeDropdownValue.bind(this);
    this.callTypeToggleDropdown = this.callTypeToggleDropdown.bind(this);
  }

  componentDidMount() {
    fetch("http://10.10.60.67/historicalreporting/getSkillsets", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          var temp = [];
          for (var looper = 0; looper < json.length; looper++) {
            temp.push({
              label: json[looper].skillset,
              value: json[looper].skillset
            });
          }
          this.setState({ skills: temp });
        });
      }
    });

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
          this.setState({ agents: json });
        });
      }
    });
  }

  callTypeToggleDropdown() {
    this.setState({
      callTypeDropdownIsOpen: !this.state.callTypeDropdownIsOpen
    });
  }

  setCallTypeDropdownValue = event => {
    if (event.target.innerHTML == "IVR Only") {
      this.setState({ selectedFinalDisposition: [] });
      this.setState({ selectedSkills: [] });
    }
    this.setState({ callTypeDropdownValue: event.target.innerHTML });
  };

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

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

  getCallsDetailsReport() {
    const tempstart = this.state.startDate.format("YYYY-MM-DD HH:mm:ss");
    const tempstop = this.state.stopDate.format("YYYY-MM-DD HH:mm:ss");
    var selectedCallType = [];
    var selectedFinalDisposition = [];
    var selectedSkills = [];
    if (this.state.callTypeDropdownValue == "IVR Only") {
      selectedCallType.push("ivr");
      selectedSkills.push("NULL");
      selectedFinalDisposition.push("NULL");
    } else if (this.state.callTypeDropdownValue == "Normal Call") {
      for (
        var looper = 0;
        looper < this.state.selectedSkills.length;
        looper++
      ) {
        selectedSkills.push(this.state.selectedSkills[looper].value);
      }
      for (
        var looper = 0;
        looper < this.state.selectedFinalDisposition.length;
        looper++
      ) {
        selectedFinalDisposition.push(
          this.state.selectedFinalDisposition[looper].value
        );
      }
      selectedCallType.push("call");
    }

    fetch("http://10.10.60.67/historicalreporting/callsDetailsReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        startDateTime: tempstart,
        endDateTime: tempstop,
        finalDisposition: selectedFinalDisposition,
        skillset: selectedSkills,
        calltype: selectedCallType
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          for (var looper = 0; looper < json.length; looper++) {
            json[looper].queuetime = moment
              .duration(parseInt(json[looper].queuetime), "seconds")
              .format("hh:mm:ss", { trim: false });
            json[looper].ringtime = moment
              .duration(parseInt(json[looper].ringtime), "seconds")
              .format("hh:mm:ss", { trim: false });

            for (
              var innerLooper = 0;
              innerLooper < this.state.agents.length;
              innerLooper++
            ) {
              if (
                json[looper].agentid == this.state.agents[innerLooper].agentId
              ) {
                json[looper].agentid = this.state.agents[innerLooper].agentName;
              }
            }
          }
          this.setState({ records: json });
          this.setState({
            exportAsCsvLink: (
              <CSVLink
                filename={
                  "Calls Details Report " +
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
    if (this.state.startDate.isAfter(this.state.stopDate)) {
      this.setState({
        modalMessage:
          "Please Make sure that Start Time is not ahead of End Time!",
        modal: !this.state.modal
      });
      return;
    }
    this.setState({ records: [] });
    this.getCallsDetailsReport();
    if (this.state.collapse == false)
      this.setState({
        collapse: !this.state.collapse
      });
  }

  onEntering() {}
  onEntered() {}
  onExiting() {}
  onExited() {}
  onChangeSkillSelect(x) {
    if (this.state.callTypeDropdownValue == "IVR Only") {
      return;
    }
    this.setState({ selectedSkills: x });
  }
  onChangeFinalDispositionSelect(x) {
    if (this.state.callTypeDropdownValue == "IVR Only") return;
    this.setState({ selectedFinalDisposition: x });
  }
  onChangeCallTypeSelect(x) {
    console.log(x);
    if (x.length == 2) {
      if (x[0].value == "ivr" || x[1].value == "ivr") {
        console.log(x[0]);
        x = [{ label: "IVR Call", value: "ivr" }];
        this.setState({ selectedSkills: [] });
        this.setState({ selectedFinalDisposition: [] });
      }
    } else if (x.length == 1) {
      if (x[0].value == "ivr") {
        console.log(x[0]);
        x = [{ label: "IVR Call", value: "ivr" }];
        this.setState({ selectedSkills: [] });
        this.setState({ selectedFinalDisposition: [] });
      }
    }
    this.setState({ selectedCallType: x });
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
                  <Label className="h6">Call Type: </Label>
                  <Dropdown
                    isOpen={this.state.callTypeDropdownIsOpen}
                    toggle={() => {
                      this.callTypeToggleDropdown();
                    }}
                  >
                    <DropdownToggle caret size="md" className="btn-block">
                      {this.state.callTypeDropdownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.setCallTypeDropdownValue}>
                        IVR Only
                      </DropdownItem>
                      <DropdownItem onClick={this.setCallTypeDropdownValue}>
                        Normal Call
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <FormText className="help-block">
                    Please select Call Type
                  </FormText>
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="3" xl="2">
                <FormGroup>
                  <Label className="h6">Final Disposition: </Label>
                  <MultiSelect
                    options={this.state.finalDisposition}
                    value={this.state.selectedFinalDisposition}
                    onChange={this.onChangeFinalDispositionSelect}
                    labelledBy={"Select Final Disposition/s"}
                  />
                </FormGroup>
              </Col>
              <Col xs="12" sm="12" md="6" lg="3" xl="2">
                <FormGroup>
                  <Label className="h6">Skill: </Label>
                  <MultiSelect
                    options={this.state.skills}
                    value={this.state.selectedSkills}
                    onChange={this.onChangeSkillSelect}
                    labelledBy={"Select Skill/s"}
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
                  <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className={this.props.className}
                  >
                    <ModalHeader toggle={this.toggleModal}>Error!</ModalHeader>
                    <ModalBody>{this.state.modalMessage}</ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={this.toggleModal}>
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>
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
                    keyField="callid"
                    data={this.state.records}
                    columns={this.state.columns}
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

export default CallsDetailsReportMain;
