import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import {Link} from "react-router-dom";

function History() {
  return (
    <div className='history-section'>
      <Container>
          <Row>
            <Col>
                <Button href = "/Measure/History/TimeHistory" className = "measure-btn">
                  Time
                </Button>
            </Col>
            <Col>
                <Button href = "/Measure/History/ParameterHistory" className = "measure-btn">
                  Parameter
                </Button>
            </Col>
          </Row>
          <Row className="measure-button-row">
            <Col>
              <Button href = "/Measure" > Back </Button>
            </Col>
          </Row>
      </Container>
    </div>
  )
}

export default History
