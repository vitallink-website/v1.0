import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function ParameterHistory() {
  return (
    <div className="history-section">
      <Container>
        <Row className="time-history-row" > 
          <h3> parameter history </h3>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row style={{ textAlign: "left" }}>
              <Link to="/Measure/History/ParameterHistory/oximetryData/heartBeatPPG">
                Heart Rate(ppg)
              </Link>
            </Row>
            <Row style={{ paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
              (beat per minute)
            </Row>
          </Col>
          <Col>
            <Row  style={{ textAlign: "left" }}>
              <Link to="/Measure/History/ParameterHistory/cardiogramData/PR_RR_Interval">
                PR/RR Interval 
              </Link>
            </Row>
            <Row style={{ paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
              (msec)
            </Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row style={{ textAlign: "left" }}>
              <Link to="/Measure/History/ParameterHistory/cardiogramData/heartBeatECG">
                Heart Rate(ecg)
              </Link>
            </Row>
            <Row style={{ paddingLeft: "1.5rem", fontSize: "0.8rem" }}>
              (beat per minute)
            </Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row>Blood Glucose</Row>
            <Row style={{ fontSize: "0.8rem" }}>(mg/dL)</Row>
          </Col>
          <Col>
            <Row  style={{ textAlign: "left" }}>
              <Link to="/Measure/History/ParameterHistory/cardiogramData/QRS_Duration">
                QRS Duration
              </Link>
            </Row>
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
            <Row style={{ textAlign: "left", paddingLeft: "0" }}>
              <Link to="/Measure/History/ParameterHistory/oximetryData/SPO2">
                SpO2
              </Link>
            </Row>
            <Row style={{ fontSize: "0.8rem", paddingLeft: "1.5rem" }}>
              ((%))
            </Row>
          </Col>
          <Col>
            <Link to="/Measure/History/ParameterHistory/TemperatureData/temperature">
              <Row>Temperature</Row>
            </Link>
            <Row style={{ fontSize: "0.8rem" }}>(‘C)</Row>
          </Col>
        </Row>
        <Row className="time-history-row">
          <Col>
            <Row style={{ textAlign: "left", paddingLeft: "0" }}>
              <Link to="/Measure/History/ParameterHistory/BPData/SYS">
                SYS/DIA
              </Link>
            </Row>
            <Row style={{ fontSize: "0.8rem", paddingLeft: "1.5rem" }}>(mmHg)</Row>
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
