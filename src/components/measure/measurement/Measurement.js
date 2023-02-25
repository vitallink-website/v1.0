import React from "react";
import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { DeviceContext } from "../../../App";
import { useEffect } from "react";

function Measurement() {
  const bluetooth = useContext(DeviceContext);
  const history = useNavigate();
  // useEffect(() => {
  //   if (!bluetooth.isConnected) history("/DeviceConnection");
  // }, [bluetooth, history]);

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
            {/* <Link to="/Measure/Measurement/BloodPressure"> */}
            <Link to="/Measure/Measurement/BloodPressure/BPWithoutCalibration">
              <Button className="measure-btn"> Blood Pressure</Button>
            </Link>

            {/* </Link> */}
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
