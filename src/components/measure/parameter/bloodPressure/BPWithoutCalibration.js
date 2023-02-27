import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MeasureBase from "../../../MeasureBase/MeasureBase";

function BPWithoutCalibration() {
  const [SYS_DIA, setSYS_DIA] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);


  const calculate = (inputs) => {
    console.log(inputs.data);
    const signal_output = Array.from(
    // eslint-disable-next-line no-undef
      BloodPressure(inputs.data.ir, inputs.data.force, inputs.freq)
    ); // HeartRate, SpO2, Quality_index
    console.log(signal_output[0]);
    console.log(signal_output[1]);
  };

  return (
    <MeasureBase
      {...{
        values: ["ir", "force"],
        diagrams: [
          {
            name: "ir",
            calculatedDots: []
          },
          {
            name: "force",
            calculatedDots: [],
          },
        ],
        command: 0x01,
        action: calculate,
        texts: ["SYS/DIA: " + SYS_DIA, "Quality index: " + qualityIndex],
        title: (openModal) => (
          <>
            <h2 className="measure-title">
              Blood Pressure Estimation without Calibration
            </h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your finger on PPG and Force sensors and try to
                  follow the force line by pressing the sensors
                </h5>
              </Col>
              <Col sm={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
            </Row>
          </>
        ),
        children: () => (
          <Row className="measure-button-row">
            <Col>
              <Link to="/Measure/Measurement">
                <Button> Back</Button>
              </Link>
            </Col>
            <Col>
              <h5 style={{ color: "black" }}>
                SYS/DIA: {Number(0.0).toFixed(2)} (mmHg)
              </h5>
            </Col>
            <Col>
              <h5 style={{ color: "black" }}>
                Quality Index: {Number(0.0).toFixed(2)} (%)
              </h5>
            </Col>
            <Col>
              <Button onClick={() => {}}>Output</Button>
            </Col>
            <Col>
              <Link to="/">
                <Button>Save</Button>
              </Link>
            </Col>
          </Row>
        ),
      }}
    />
  );
}

export default BPWithoutCalibration;
