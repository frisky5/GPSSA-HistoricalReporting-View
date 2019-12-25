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
  Row
} from "reactstrap";
import moment from "moment";
import { DatetimePicker, DatetimePickerTrigger } from "rc-datetime-picker";
import momentDurationPlugin from "moment-duration-format";
import "rc-datetime-picker/dist/picker.css";
momentDurationPlugin(moment);
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class CallsSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      stopDate: moment(),
      collapse: false,
      Entering: "Loading...",
      Entered: "Loaded...",
      Exiting: "Exiting...",
      Exited: "Exited...",
      callsAfterWorkingHours: "",
      mostFrequentNumber: "",
      numberOfIvrCalls: "",
      maxTalkTime: "",
      numberOfComplainCalls: "",
      minimumWaitTime: "",
      minimumTalkTime: "",
      numberOfAbandonedCalls: "",
      maximumWaitingTime: "",
      maximumNumberOfWaitingCalls: "",
      records: "",
      totalNumberOfAllCalls: "",
      totalCallsOfGeneralArabic: "",
      totalCallsOfGeneralEnglish: "",
      totalCallsOfComplaintsArabic: "",
      totalCallsOfComplaintsEnglish: ""
    };
    this.toggle = this.toggle.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
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

  getSummaryReport() {
    const tempstart = this.state.startDate.format("YYYY-MM-DD HH:mm:ss");
    const tempstop = this.state.stopDate.format("YYYY-MM-DD HH:mm:ss");
    fetch("http://10.10.60.67/historicalreporting/summaryReport", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        startDateTime: tempstart,
        endDateTime: tempstop
      })
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            callsAfterWorkingHours: json.callsAfterWorkingHours
          });
          this.setState({
            mostFrequentNumber: json.mostFrequentNumber
          });
          this.setState({
            numberOfIvrCalls: json.numberOfIvrCalls
          });
          this.setState({
            maxTalkTime: moment
              .duration(parseInt(json.maxTalkTime), "seconds")
              .format("hh:mm:ss", { trim: false })
          });
          this.setState({
            numberOfComplainCalls: json.numberOfComplainCalls
          });
          this.setState({
            minimumWaitTime: moment
              .duration(parseInt(json.minimumWaitTime), "seconds")
              .format("hh:mm:ss", { trim: false })
          });
          this.setState({
            minimumTalkTime: moment
              .duration(parseInt(json.minimumTalkTime), "seconds")
              .format("hh:mm:ss", { trim: false })
          });
          this.setState({
            numberOfAbandonedCalls: json.numberOfAbandonedCalls
          });
          this.setState({
            maximumWaitingTime: moment
              .duration(parseInt(json.maximumWaitingTime), "seconds")
              .format("hh:mm:ss", { trim: false })
          });
          this.setState({
            maximumNumberOfWaitingCalls: json.maximumNumberOfWaitingCalls
          });
          this.setState({
            totalNumberOfAllCalls: json.totalNumberOfAllCalls
          });
          this.setState({
            totalCallsOfComplaintsArabic: json.totalCallsOfComplaintsArabic
          });
          this.setState({
            totalCallsOfComplaintsEnglish: json.totalCallsOfComplaintsEnglish
          });
          this.setState({
            totalCallsOfGeneralArabic: json.totalCallsOfGeneralArabic
          });
          this.setState({
            totalCallsOfGeneralEnglish: json.totalCallsOfGeneralEnglish
          });
        });
      }
    });
  }
  toggle() {
    if (this.state.collapse == false) {
      this.getSummaryReport();
      this.setState({
        collapse: !this.state.collapse
      });
    } else {
      this.getSummaryReport();
    }
  }

  onEntering() {}
  onEntered() {}
  onExiting() {}
  onExited() {}
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
                        placeholder="Normal"
                      />
                    </DatetimePickerTrigger>
                    <FormText className="help-block">
                      Please select end date & time
                    </FormText>
                  </FormGroup>
                </Col>
                <Col xs="12" sm="2" md="3" lg="2" xl="1">
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
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Longest Talking Time
                        </CardHeader>
                        <CardBody>{this.state.maxTalkTime}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Shortest Talking Time
                        </CardHeader>
                        <CardBody>{this.state.minimumTalkTime}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Longest Waiting Time
                        </CardHeader>
                        <CardBody>{this.state.maximumWaitingTime}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Shortest Waiting Time
                        </CardHeader>
                        <CardBody>{this.state.minimumWaitTime}</CardBody>
                      </Card>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">
                          Most Frequent Number
                        </CardHeader>
                        <CardBody>{this.state.mostFrequentNumber}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">#No of All Calls</CardHeader>
                        <CardBody>{this.state.totalNumberOfAllCalls}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">#No of IVR Calls</CardHeader>
                        <CardBody>{this.state.numberOfIvrCalls}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">
                          #No of Call after 2:30 PM
                        </CardHeader>
                        <CardBody>{this.state.callsAfterWorkingHours}</CardBody>
                      </Card>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          General Arabic Calls
                        </CardHeader>
                        <CardBody>
                          {this.state.totalCallsOfGeneralArabic}
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="12" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          General English Calls
                        </CardHeader>
                        <CardBody>
                          {this.state.totalCallsOfGeneralEnglish}
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="12" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          Complaints Arabic Calls
                        </CardHeader>
                        <CardBody>
                          {this.state.totalCallsOfComplaintsArabic}
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="12" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          Complaints English Calls
                        </CardHeader>
                        <CardBody>
                          {this.state.totalCallsOfComplaintsEnglish}
                        </CardBody>
                      </Card>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          #No of Abondened Calls
                        </CardHeader>
                        <CardBody>{this.state.numberOfAbandonedCalls}</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="12" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          Maximum Number of Waiting Calls
                        </CardHeader>
                        <CardBody>
                          {this.state.maximumNumberOfWaitingCalls}
                        </CardBody>
                      </Card>
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

export default CallsSummary;
