import React, { Component } from "react";
import { Col, Label, Input, Button, FormGroup, Container } from "reactstrap";
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
      startDate: moment().subtract(1, 'days'),
      stopDate: moment()
    };
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStopDateChange = this.onStopDateChange.bind(this);
    this.runOnClick = this.runOnClick.bind(this);
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
  render() {
    return (
      <React.Fragment>
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
