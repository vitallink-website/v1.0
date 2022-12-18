import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Measurement() {
  return (
    <div class="measure-section">
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Button
              href="/Measure/Measurement/HeartAndLungSound"
              className="measure-btn"
            >
              Heart and Lung Sound
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              href="/Measure/Measurement/Oximetry"
              className="measure-btn"
            >
              Oximetry
            </Button>
          </Col>
          <Col>
            <Button
              href="/Measure/Measurement/Cardiogram"
              className="measure-btn"
            >
              Cardiogram
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              href="/Measure/Measurement/BloodGlucose"
              className="measure-btn"
            >
              Blood Glucose
            </Button>
          </Col>
          <Col>
            <Button
              href="/Measure/Measurement/BloodPressure"
              className="measure-btn"
            >
              Blood Pressure
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              href="/Measure/Measurement/Temperature"
              className="measure-btn"
            >
              Temperature
            </Button>
          </Col>
          <Col>
            <Button
              href="/Measure/Measurement/GalvanicSkinResponse"
              className="measure-btn"
            >
              Galvanic Skin Response
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <h5 style={{ color: "black" }}>
            Whenever Quality index {"<"} 80 please repeat the procedure!{" "}
          </h5>
        </Row>
        <Row>
          <Col>
            <Button href="/Measure"> Back </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Measurement;
