import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BloodPressure() {
  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">Blood Pressure</h2>
      <br />
      <br />

      <Row>
        <Col>
          <Link to="/Measure/Measurement/BloodPressure/BPWithoutCalibration">
            <Button> Without Calibration</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/Measure/Measurement/BloodPressure/BPWithCalibration">
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

export default BloodPressure;
