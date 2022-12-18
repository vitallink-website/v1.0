import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ParameterHistory() {
  return (
    <div className="history-section">
      <Container>
        <Row className="time-history-row">
          <Col>
            <Row>Heart Rate</Row>
            <Row style={{ fontSize: "0.8rem" }}>(beat per minute)</Row>
          </Col>
          <Col>
            <Row>PR/RR Interval </Row>
            <Row style={{ fontSize: "0.8rem" }}>(msec)</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>Blood Glucose</Row>
            <Row style={{ fontSize: "0.8rem" }}>(mg/dL)</Row>
          </Col>
          <Col>
            <Row>QRS Duration</Row>
            <Row style={{ fontSize: "0.8rem" }}>(msec)</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>Respiration Rate</Row>
            <Row style={{ fontSize: "0.8rem" }}>(breath per minute)</Row>
          </Col>
          <Col>
            <Row>HR Variation</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>SpO2</Row>
            <Row style={{ fontSize: "0.8rem" }}>((%))</Row>
          </Col>
          <Col>
            <Row>Temperature</Row>
            <Row style={{ fontSize: "0.8rem" }}>(‘C)</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>Sys/DIA</Row>
            <Row style={{ fontSize: "0.8rem" }}>(mmHg)</Row>
          </Col>
          <Col>
            <Row>GSR</Row>
            <Row style={{ fontSize: "0.8rem" }}>(Siemens)</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>Lung Abnormality</Row>
          </Col>
          <Col>
            <Row>Arrythmia Type</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>Heart Abnormality</Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/Measure/History">
              <Button size="sm"> Back</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ParameterHistory;
