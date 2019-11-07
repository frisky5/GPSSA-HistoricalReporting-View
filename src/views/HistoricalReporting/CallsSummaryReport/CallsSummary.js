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
  Row,
} from "reactstrap";
import moment from "moment";
import { DatetimePicker, DatetimePickerTrigger } from "rc-datetime-picker";
import "rc-datetime-picker/dist/picker.css";

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
      Exited: "Exited..."
    };
    this.toggle = this.toggle.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
  }

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
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          LONGEST TALKING TIME
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Shortest Talking Time
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Maximum Wait Time
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-primary">
                        <CardHeader className="h6">
                          Shortest Wait Time
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">
                          Most Frequent Number
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">
                          #No of Complaint Calls
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">#No of IVR Calls</CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-warning">
                        <CardHeader className="h6">
                          #No of Call after 2:30 PM
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col xs="12" sm="6" md="5" lg="5" xl="3">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          #No of Abondened Calls
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="12" lg="5" xl="4">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          #No of Agent Abondened Calls
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" sm="6" md="12" lg="5" xl="4">
                      <Card className="card-accent-success">
                        <CardHeader className="h6">
                          Maximum Number of Waiting Calls
                        </CardHeader>
                        <CardBody>TEXT</CardBody>
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
