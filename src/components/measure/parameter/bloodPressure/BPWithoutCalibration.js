import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

function BPWithoutCalibration() {
  return (
    <div class="measure-section">
      <br /><br />
      <h2 className="measure-title">Blood Pressure Estimation without Calibration</h2>

    
      <Row className="measure-button-row">
        <Col>
          <Button href = "/Measure/Measurement/BloodPressure"> Back </Button>
        </Col>
        <Col>
          <Button href = "./"> Output </Button>
        </Col>
        <Col>
          <Button href = "./"> Save </Button>
        </Col>
      </Row>
    </div>
  )
}

export default BPWithoutCalibration
