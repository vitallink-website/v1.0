import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeartAndLungSound() {
  return (
<MeasureBase
      {...{
        values: ["red", "ir", "force"],
        diagrams: [
          {
            name: "red",
            calculatedDots: [],
          },
        ],
        command: 0x03,
        action: calculate,
        texts: [
          "Heart beat: " + heartBeat,
          "Quality index: " + qualityIndex,
        ],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Heart and Lung Sound</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                Select one of the following positions, then put the microphone on that position and press 
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
                  Heart Rate: {heartBeat} (bpm)
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}> Respiration Rate (breath per minute)</h5>
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
                    shareData("OximetryData", [
                      "Heart beat: " + heartBeat,
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

export default HeartAndLungSound;
