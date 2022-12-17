import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

function AbnormalityDetection() {
  return (
    <div class="measure-section">
      <br /><br />
      <h2 className="measure-title">Cardiogram</h2>
      <h2 className="measure-title">Abnormality Detection</h2>

    
      <Row className="measure-button-row">
        <Col>
          <Button href = "/Measure/Measurement/Cardiogram"> Back </Button>
        </Col>
        <Col>
          <Button href = "./"> Save </Button>
        </Col>
      </Row>
    
    </div>
  )
}

export default AbnormalityDetection
