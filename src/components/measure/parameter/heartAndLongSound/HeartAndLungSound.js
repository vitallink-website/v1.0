import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useState, useEffect } from "react";
import { shareData } from "../../share/Share";
import { AiFillPlayCircle } from "react-icons/ai";
import { useAddToDB } from "../../../../utilities/AddToDB";

function HeartAndLungSound() {
  const [sound, setSound] = useState([]);
  const [heartBeat, setHeartBeat] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const dbFunc = useAddToDB("PCGData");

  // const prepareWavFile = (sound) => {
  //   let max = Math.abs(sound[0]);
  //   for (let i = 1; i < sound.length; ++i) {
  //     var temp = Math.abs(sound[i])
  //     if (temp > max)
  //       max = temp;
  //   }
  //   var newData = sound.map(function(item) { return item/max } )
  //   const blob = new Blob([newData], { type: 'audio/wav' });
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);
  //   var audio = new Audio(url);
  //   audio.play().catch(console.log);
  // };

  function playWave(byteArray) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var myAudioBuffer = audioCtx.createBuffer(1, byteArray.length, 16000);
    var nowBuffering = myAudioBuffer.getChannelData(0);
    for (var i = 0; i < byteArray.length; i++) {
      nowBuffering[i] = byteArray[i];
    }

    var source = audioCtx.createBufferSource();
    source.buffer = myAudioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  }

  var context = new AudioContext();
  var arrayBuffer;
  function playByteArray(byteArray) {
    context = new (window.AudioContext || window.webkitAudioContext)();
    // var arrayBuffer = new ArrayBuffer(byteArray.length);
    var arrayBuffer = new ArrayBuffer(byteArray.length);
    for (var i = 0; i < byteArray.length; i++) {
      arrayBuffer[i] = byteArray[i];
    }
    context.decodeAudioData(arrayBuffer, function (buffer) {
      var source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start();
    });
  }

  const playAudio = () => {
  };

  const calculate = (inputs) => {
    console.log(inputs.data);
    console.log(inputs.freq);
    setSound(inputs.data.pcg);
    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      PCG_signal_processing(inputs.data.pcg, inputs.freq)
    );
    console.log(signal_output);
    
  };

  return (
    <MeasureBase
      {...{
        values: ["pcg"],
        diagrams: [
          {
            name: "pcg",
            calculatedDots: [],
          },
        ],
        command: 0x03,
        action: calculate,
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
            <Row className="mt-5"></Row>
            <Row className="mt-5">
              <Col>
                <Button onClick={() => playAudio()}>
                  play <AiFillPlayCircle />
                </Button>
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
