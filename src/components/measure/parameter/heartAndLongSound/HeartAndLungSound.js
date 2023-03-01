import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useState } from "react";
import { shareData } from "../../share/Share";
import { AiFillPlayCircle } from "react-icons/ai";

function HeartAndLungSound() {
  const [heartBeat, setHeartBeat] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);

  const playAudio = (inputs) => {
    console.log(inputs.data);
    console.log(inputs.freq);
    // var audio = new Audio(inputs.data.pcg);
    // audio.play();
  };

  return (
    <MeasureBase
      {...{
        values: ["pcg"],
        diagrams: [],
        command: 0x03,
        action: playAudio,
        texts: ["Heart beat: " + heartBeat, "Quality index: " + qualityIndex],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Heart and Lung Sound</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Select one of the following positions, then put the microphone
                  on that position and press
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
                <Button onClick={() => playAudio()}>play <AiFillPlayCircle /></Button>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <h5 style={{ color: "black" }}>
                  Heart Rate: {heartBeat} (bpm)
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  {" "}
                  Respiration Rate (breath per minute)
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
                    shareData("pcgData", [
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
