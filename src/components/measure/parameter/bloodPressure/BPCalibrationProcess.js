import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BPCalibrationProcess() {
  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">Calibration Process</h2>

      <Row className="measure-button-row">
        <Col>
          <Link to="/Measure/Measurement">
            <Button> Back</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <Button> Output</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <Button> Save</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default BPCalibrationProcess;
