import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function BPWithCalibration() {
  return (
    <div class="measure-section">
      <br />
      <br />
      <h2 className="measure-title">
        Blood Pressure Estimation with Calibration
      </h2>
      <Row>
        <Col>
          <Button href="/Measure/Measurement/BloodPressure/BPWithCalibration/BPCalibrationProcess">
            {" "}
            Calibration{" "}
          </Button>
        </Col>
        <Col>
          <Button href="/Measure/Measurement/BloodPressure/BPWithCalibration/BPEstimate">
            {" "}
            Measurement{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="measure-button-row">
          <Button href="/Measure/Measurement/BloodPressure"> Back </Button>
        </Col>
      </Row>
    </div>
  );
}

export default BPWithCalibration;
