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
  DropdownToggle
} from "reactstrap";
import moment from "moment";
import { DatetimePicker, DatetimePickerTrigger } from "rc-datetime-picker";
import "rc-datetime-picker/dist/picker.css";
import BootstrapTable from "react-bootstrap-table-next";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class CallsDetailsReportMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      callTypeDropDownValue: "Select Type...",
      callDispositionValue: "Select Type...",
      startDate: moment(),
      stopDate: moment(),
      collapse: false,
      Entering: "Loading...",
      Entered: "Loaded...",
      Exiting: "Exiting...",
      Exited: "Exited...",
      products: [
        {
          callID: 1,
          callDateTime: "TV",
          callerNumber: 1000,
          numberOfRings: 5,
          typeOfCallWorkCode: "Test Call",
          finalDesposition: "Questionere",
          waitingTimeBeofreDrop: 4
        },
        {
          callID: 2,
          callDateTime: "TV",
          callerNumber: 1000,
          numberOfRings: 5,
          typeOfCallWorkCode: "Test Call",
          finalDesposition: "Questionere",
          waitingTimeBeofreDrop: 4
        },
        {
          callID: 3,
          callDateTime: "TV",
          callerNumber: 1000,
          numberOfRings: 5,
          typeOfCallWorkCode: "Test Call",
          finalDesposition: "Questionere",
          waitingTimeBeofreDrop: 4
        }
      ],
      columns: [
        {
          dataField: "callID",
          text: "Call ID",
          headerAlign: "left",
          align: "left",
          headerTitle: true
        },
        {
          dataField: "callDateTime",
          text: "Call Date & Time",
          sort: true,
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "callerNumber",
          text: "Caller Number",
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "numberOfRings",
          text: "#No of Rings until Answer",
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "typeOfCallWorkCode",
          text: "Type of Call",
          headerAlign: "left",
          align: "left"
        },
        {
          dataField: "finalDesposition",
          text: "Final Desposition",
          headerAlign: "left",
          align: "left"
        },
        ,
        {
          dataField: "waitingTimeBeofreDrop",
          text: "Waiting Time before Drop",
          headerAlign: "left",
          align: "left"
        }
      ]
    };
    this.toggle = this.toggle.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.setCallTypeDropDownValue = this.setCallTypeDropDownValue.bind(this);
  }

  toggleDropDown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  setCallTypeDropDownValue = event => {
    this.setState({ callTypeDropDownValue: event.target.innerHTML });
  };

  setCallDispositionDropDownValue = event => {
    this.setState({ callTypeDropDownValue: event.target.innerHTML });
  };

  goButtonContent() {
    if (this.state.collapse == true) {
      return (
        <div>
          <Spacer height="28px" />
          <Button
            block
            color="success"
            className="btn-pill"
            onClick={this.toggle}
          >
            <DotLoader
              css={override}
              sizeUnit={"px"}
              size={20}
              color={"#FFFFFF"}
              loading={this.state.loading}
            />
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Spacer height="28px" />
          <Button
            block
            color="success"
            className="btn-pill"
            onClick={this.toggle}
          >
            Go!
          </Button>
        </div>
      );
    }
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

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    });
    console.log(this.state.collapse);
  }
  onEntering() {}
  onEntered() {}
  onExiting() {}
  onExited() {}
  expandRow = {
    renderer: row => (
      <div>
        <BootstrapTable
          striped={true}
          bordered={false}
          hover={true}
          rowStyle={{ backgroundColor: "white" }}
          keyField="id"
          data={this.state.products}
          columns={this.state.columns}
          condensed={false}
        />
      </div>
    )
  };
  render() {
    return (
      <div className="animated fadeIn">
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <Card className="animated fadeIn ">
            <CardHeader>Please select Start & End Data/Time</CardHeader>
            <CardBody className="animated fadeIn">
              <FormGroup row>
                <Col xs="12" sm="6" md="6" lg="3" xl="3">
                  <FormGroup>
                    <Label className="h6">Start: </Label>
                    <DatetimePickerTrigger
                      moment={this.state.startDate}
                      onChange={this.onStartDateChange}
                      className="danger"
                    >
                      <Input
                        type="text"
                        value={this.state.startDate.format(
                          "DD/MM/YYYY  hh:mm A"
                        )}
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

                <Col xs="12" sm="6" md="6" lg="3" xl="3">
                  <FormGroup>
                    <Label className="h6">End: </Label>
                    <DatetimePickerTrigger
                      moment={this.state.stopDate}
                      onChange={this.onStopDateChange}
                    >
                      <Input
                        type="text"
                        value={this.state.stopDate.format(
                          "DD/MM/YYYY  hh:mm A"
                        )}
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
                <Col xs="12" sm="6" md="6" lg="2" xl="2">
                  <FormGroup>
                    <Label className="h6">Call Type: </Label>
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={() => {
                        this.toggleDropDown();
                      }}
                    >
                      <DropdownToggle caret>
                        {this.state.callDispositionDropDownValue}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={this.setCallDispositionDropDownValue}
                        >
                          Type 1
                        </DropdownItem>
                        <DropdownItem
                          onClick={this.setCallDispositionDropDownValue}
                        >
                          Type 2
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <FormText className="help-block">
                      Please select Call Disposition type
                    </FormText>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="6" md="6" lg="2" xl="2">
                  <FormGroup>
                    <Label className="h6">Final Dispostion: </Label>
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={() => {
                        this.toggleDropDown();
                      }}
                    >
                      <DropdownToggle caret>
                        {this.state.callTypeDropDownValue}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.setCallTypeDropDownValue}>
                          Type 1
                        </DropdownItem>
                        <DropdownItem onClick={this.setCallTypeDropDownValue}>
                          Type 2
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <FormText className="help-block">
                      Please select call desposition type
                    </FormText>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="2" md="3" lg="2" xl="2">
                  <FormGroup>{this.goButtonContent()}</FormGroup>
                </Col>
              </FormGroup>

              <FormGroup>
                <Collapse
                  isOpen={this.state.collapse}
                  onEntering={this.onEntering}
                  onEntered={this.onEntered}
                  onExiting={this.onExiting}
                  onExited={this.onExited}
                  className="animated fadeIn fadeOut"
                >
                  <FormGroup row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <BootstrapTable
                        striped={false}
                        bordered={true}
                        hover={true}
                        rowStyle={{ backgroundColor: "white" }}
                        keyField="callID"
                        data={this.state.products}
                        columns={this.state.columns}
                        condensed={true}
                        expandRow={this.expandRow}
                      />
                    </Col>
                  </FormGroup>
                </Collapse>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default CallsDetailsReportMain;
