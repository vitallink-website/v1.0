import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

function BPEstimate() {
  return (
    <div class="measure-section">
      <br /><br />
      <h2 className="measure-title">Estimation Process</h2>

    
      <Row className="measure-button-row">
        <Col>
          <Button href = "/Measure/Measurement/BloodPressure/BPWithCalibration"> Back </Button>
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

export default BPEstimate
