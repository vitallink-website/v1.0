import React from 'react'
import { Row, Col, Button } from "react-bootstrap";

function HeartAndLungSound() {
  return (
    <div class="measure-section">
      <br /><br />
      <h2 className="measure-title">Heart and Lung Sound</h2>

        <Row className="measure-button-row" >
          <Col>
            <Button href = "/Measure/Measurement"> Back </Button>
          </Col>
          <Col>
            <Button href = "./"  > Output </Button>
          </Col>
          <Col>
            <Button href = "./" > Save </Button>
          </Col>
        </Row>
    </div>
  )
}

export default HeartAndLungSound
