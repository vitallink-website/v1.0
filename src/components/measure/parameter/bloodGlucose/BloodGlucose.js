import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function BloodGlucose() {
  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">Blood Glucose</h2>
      <br />
      <br />

      <Row>
        <Col>
          <Link to="/">
            <Button> Without Calibration</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <Button> With Calibration</Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col className="measure-button-row">
          <Link to="/Measure/Measurement">
            <Button> Back</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default BloodGlucose;
