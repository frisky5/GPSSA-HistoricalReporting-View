import React, { Component } from "react";
import {
  Col,
  Label,
  Input,
  Button,
  FormGroup,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormText
} from "reactstrap";
import moment from "moment";
import { DatetimePickerTrigger } from "rc-datetime-picker";
import "rc-datetime-picker/dist/picker.css";
import Spacer from "react-spacer";
import momentDurationPlugin from "moment-duration-format";
momentDurationPlugin(moment);

class GraphicalPortalFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().subtract(1, "days"),
      stopDate: moment(),
      surevyTypeDropdownIsOpen: false,
      surveyTypeDropdownValue: "Summary"
    };
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
    this.runOnClick = this.runOnClick.bind(this);
    this.setsurveyTypeDropdownValue = this.setsurveyTypeDropdownValue.bind(
      this
    );
    this.surveyTypeToggleDropdown = this.surveyTypeToggleDropdown.bind(this);
  }
  onStartDateChange = startDate => {
    this.setState({
      startDate
    });
    this.props.startTime(startDate);
  };
  onStopDateChange = stopDate => {
    this.setState({
      stopDate
    });
    this.props.stopTime(stopDate);
  };

  runOnClick() {
    this.props.run();
  }
  setsurveyTypeDropdownValue = event => {
    this.setState({ surveyTypeDropdownValue: event.target.innerHTML });
    this.props.setSelectedReport(event.target.innerHTML);
  };
  surveyTypeToggleDropdown() {
    this.setState({
      surevyTypeDropdownIsOpen: !this.state.surevyTypeDropdownIsOpen
    });
  }
  render() {
    return (
      <React.Fragment>
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
                  Summary
                </DropdownItem>
                <DropdownItem onClick={this.setsurveyTypeDropdownValue}>
                  Agents Performance
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <FormText className="help-block">
              Please select Survey Type
            </FormText>
          </FormGroup>
        </Col>
        <Col
          xs="auto"
          sm="auto"
          md="auto"
          lg="auto"
          xl="auto"
          className="animated fadeIn"
        >
          <Label className="h6">
            Start
            Date/Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Label>

          <DatetimePickerTrigger
            moment={this.state.startDate}
            onChange={this.onStartDateChange}
            size="10"
          >
            <Input
              type="text"
              value={this.state.startDate.format("DD/MM/YYYY hh:mm A")}
              size="10"
              placeholder="Normal"
              readOnly={true}
            />
          </DatetimePickerTrigger>
        </Col>
        <Col
          xs="auto"
          sm="auto"
          md="auto"
          lg="auto"
          xl="auto"
          className="animated fadeIn"
        >
          <Label className="h6">
            End
            Date/Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Label>
          <DatetimePickerTrigger
            moment={this.state.stopDate}
            onChange={this.onStopDateChange}
          >
            <Input
              type="text"
              value={this.state.stopDate.format("DD/MM/YYYY hh:mm A")}
              size="10"
              placeholder="Normal"
              readOnly={true}
            />
          </DatetimePickerTrigger>
        </Col>
        <Col
          xs="auto"
          sm="auto"
          md="auto"
          lg="auto"
          xl="auto"
          className="animated fadeIn"
        >
          <Spacer height="28px" />
          <Button
            color="success"
            className="btn-pill"
            onClick={this.runOnClick}
          >
            Run
          </Button>
        </Col>
      </React.Fragment>
    );
  }
}
export default GraphicalPortalFields;
