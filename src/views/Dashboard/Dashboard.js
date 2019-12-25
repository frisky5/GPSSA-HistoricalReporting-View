import React, { Component } from "react";
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
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggleAgents = this.toggleAgents.bind(this);
    this.toggleSkills = this.toggleSkills.bind(this);
  }

  toggleAgents() {
    {
      window.open("http://10.10.60.61:5000/agents", "");
    }
  }

  toggleSkills() {
    {
      window.open("http://10.10.60.61:5000/skills", "");
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Card>
              <CardHeader>Choose a dashboard to open</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    <FormGroup>
                      <Button
                        block
                        color="success"
                        className="btn-pill"
                        onClick={this.toggleAgents}
                      >
                        Agents Dashboard
                      </Button>
                    </FormGroup>
                  </Col>
                  <Col xs="4" sm="4" md="4" lg="4" xl="4">
                    <FormGroup>
                      <Button
                        block
                        color="success"
                        className="btn-pill"
                        onClick={this.toggleSkills}
                      >
                        Skills Dashboard
                      </Button>
                    </FormGroup>
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

export default Dashboard;
