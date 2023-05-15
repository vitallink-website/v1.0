import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function History() {
  return (
    <div className="history-section">
      <Container>
        <Row>
          <Col>
            <Link to="/Measure/History/TimeHistory">
              <Button className="measure-btn"> Time</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/Measure/History/ParameterHistory">
              <Button className="measure-btn"> Parameter</Button>
            </Link>
          </Col>
        </Row>
        <Row className="measure-button-row">
          <Col>
            <Link to="/Measure">
              <Button> Back</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default History;
