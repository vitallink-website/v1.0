import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BPWithCalibration() {
  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">
        Blood Pressure Estimation with Calibration
      </h2>
      <Row>
        <Col>
          <Link to="/Measure/Measurement/BloodPressure/BPWithCalibration/BPCalibrationProcess">
            <Button> Calibration</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/Measure/Measurement/BloodPressure/BPWithCalibration/BPEstimate">
            <Button> Measurement</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="measure-button-row">
          <Link to="/Measure/Measurement/BloodPressure">
            <Button> Back</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default BPWithCalibration;
