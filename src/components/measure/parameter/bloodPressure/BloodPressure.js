import React from 'react'
import { Row, Col, Button } from "react-bootstrap";

function BloodPressure() {
  return (
    <div class="measure-section">
      <br /><br />
      <h2 className="measure-title">Blood Pressure</h2>
      <br /><br />

    
      <Row>
        <Col>
          <Button href = "/Measure/Measurement/BloodPressure/BPWithoutCalibration"> Without Calibration </Button>
        </Col>
        <Col>
          <Button href = "/Measure/Measurement/BloodPressure/BPWithCalibration"> With Calibration </Button>
        </Col>
        
      </Row>

      <Row>
        <Col className="measure-button-row">
          <Button  href = "/Measure/Measurement"> Back </Button>
        </Col>
      </ Row>
    </div>
  )
}

export default BloodPressure
