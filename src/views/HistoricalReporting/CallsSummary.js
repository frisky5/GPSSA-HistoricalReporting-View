import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import DateTimePicker from "react-datetime-picker";
class CallsSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      stopDate: new Date()
    };
  }
  onStartDateChange = startDate => this.setState({ startDate });
  onStopDateChange = stopDate => this.setState({ stopDate });

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card>
              <CardHeader>Please select Start & End Data/Time</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="3" sm="3" md="3" lg="1" xl="1">
                    <label>Start:</label>
                  </Col>
                  <Col xs="3" sm="3" md="3" lg="3" xl="3">
                    <DateTimePicker
                      name="Start Date/Time"
                      onChange={this.onStartDateChange}
                      value={this.state.startDate}
                    />
                  </Col>
                  <Col xs="3" sm="3" md="3" lg="1" xl="1">
                    <label>End:</label>
                  </Col>
                  <Col xs="3" sm="3" md="3" lg="3" xl="3">
                    <DateTimePicker
                      name="Start Date/Time"
                      onChange={this.onStopDateChange}
                      value={this.state.stopDate}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CallsSummary;
