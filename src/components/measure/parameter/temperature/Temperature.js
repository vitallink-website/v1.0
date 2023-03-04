import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";

function Temperature() {
  const [temperature, setTemperature] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);

  const calculateTemperature = (inputs) => {
    console.log(inputs.data.temperature);
  }

  return (
    <MeasureBase
      {...{
        values: ["temperature"],
        diagrams: [
          {
            name: "temperature",
            calculatedDots: [],
          },
        ],
        command: 0x04,
        action: calculateTemperature,
        texts: ["Temperature: " + temperature, "Quality index: " + qualityIndex],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Temperature</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your finger on temperature sensors and then press
                </h5>
              </Col>
              <Col sm={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
            </Row>
          </>
        ),
        children: () => (
          <>
            <Row className="mt-5">
              <Col>
                <h5 style={{ color: "black" }}>
                  Temperature
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  Quality Index: {qualityIndex} (%)
                </h5>
              </Col>
            </Row>
            <Row className="measure-button-row">
              <Col>
                <Link to="/Measure/Measurement">
                  <Button> Back</Button>
                </Link>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    shareData("TemperatureData", [
                      "Temperature: " + temperature,
                      "Quality index: " + qualityIndex,
                    ]);
                  }}
                >
                  Output
                </Button>
              </Col>
              <Col>
                <Link to="/">
                  <Button>Save</Button>
                </Link>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
}

export default Temperature;
