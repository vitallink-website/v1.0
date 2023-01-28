import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Measurement() {
  return (
    <div className="measure-section">
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            <Link to="/Measure/Measurement/HeartAndLungSound">
              <Button className="measure-btn" disabled>
                Heart and Lung Sound
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/Measure/Measurement/Oximetry">
              <Button className="measure-btn">Oximetry</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/Measure/Measurement/Cardiogram">
              <Button className="measure-btn">Cardiogram</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/Measure/Measurement/BloodGlucose">
              <Button className="measure-btn" disabled>
                Blood Glucose
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/Measure/Measurement/BloodPressure">
              <Button className="measure-btn"> Blood Pressure</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/Measure/Measurement/Temperature">
              <Button className="measure-btn" disabled>
                Temperature
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/Measure/Measurement/GalvanicSkinResponse">
              <Button className="measure-btn" disabled>
                Galvanic Skin Response
              </Button>
            </Link>
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
            <Link to="/Measure">
              <Button> Back </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Measurement;
