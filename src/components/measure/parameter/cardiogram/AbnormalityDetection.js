import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function AbnormalityDetection() {
  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">Cardiogram</h2>
      <h2 className="measure-title">Abnormality Detection</h2>
      <Row className="measure-button-row">
        <Col>
          <Link to="/Measure/Measurement/Cardiogram">
            <Button> Back</Button>
          </Link>
        </Col>
        <Col>
          <Link to="#">
            <Button> Save</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default AbnormalityDetection;
