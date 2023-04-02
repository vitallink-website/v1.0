import React from "react";
import { Row, Col, Button, Dropdown , DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useState } from "react";
import { shareData } from "../../share/Share";
import { AiFillPlayCircle } from "react-icons/ai";
import { useAddToDB } from "../../../../utilities/AddToDB";
import axios from "axios";

function HeartAndLungSound() {
  const [sound, setSound] = useState([]);
  const [heartBeat, setHeartBeat] = useState(0);
  const [respirationRate, setRespirationRate] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const dbFunc = useAddToDB("PCGData");
  const [filterActiveNum, setFilterActiveNum] = useState(0);

  async function calculate(inputs) {
    console.log(inputs.data);
    console.log(inputs.freq);
    setSound(inputs.data.pcg);
    
    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      await PCG_signal_processing(inputs.data.pcg, inputs.freq)
    );
    console.log(signal_output);   
    setHeartBeat(signal_output[0]);
    setRespirationRate(signal_output[1]);
    setQualityIndex(signal_output[2]);

    return [Array.from(signal_output[4]), //pcg_filtered
            Array.from(signal_output[5]), //heart_signal
            Array.from(signal_output[6]), //lung_signal
            Array.from(signal_output[7]), //heart_signal_snr
            Array.from(signal_output[8])];//lung_signal_snr
  };

  async function calculateBeatPerMinuteAPI(inputs) {
    let payload = {
      pcg: "[" + inputs.data.pcg.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("http://127.0.0.1:5000//PCG_signal", payload);    
    console.log(res.data);
    setHeartBeat(res.data.heart_rate);
    setRespirationRate(res.data.respiration_rate);
    setQualityIndex(res.data.lung_quality_ind);

    return [Array.from(res.data.pcg_filtered), //pcg_filtered
            Array.from(res.data.heart_signal), //heart_signal
            Array.from(res.data.lung_signal), //lung_signal
            Array.from(res.data.heart_signal_snr), //heart_signal_snr
            Array.from(res.data.lung_signal_snr)];//lung_signal_snr
  }

  function handleChange(number, changeFilterShow){
    setFilterActiveNum(number);
    changeFilterShow(number)
  }

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
        action: calculateBeatPerMinuteAPI,
        texts: ["Heart beat: " + heartBeat, "Quality index: " + qualityIndex],
        title: (openModal, changeFilterShow) => (
          <>
            <h2 className="measure-title">Heart and Lung Sound</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={5}>
                <h5 className="measure-title">
                  put the microphone on your heart position and press
                </h5>
              </Col>
              <Col sm={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
              <Col sm={3}>
                <DropdownButton id="dropdown-basic-button" title="Choose signal">
                  <Dropdown.Item onClick={() => handleChange(5, changeFilterShow)} active={filterActiveNum === 5}>heart</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChange(4, changeFilterShow)} active={filterActiveNum === 4}>heart with filter</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChange(3, changeFilterShow)} active={filterActiveNum === 3}>lung</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChange(2, changeFilterShow)} active={filterActiveNum === 2}>lung with filter</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChange(1, changeFilterShow)} active={filterActiveNum === 1}>both with filter</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleChange(0, changeFilterShow)} active={filterActiveNum === 0}>both without filter</Dropdown.Item>
                </DropdownButton>
              </Col>             
            </Row>
          </>
        ),
        children: () => (
          <>
            <Row className="mt-5"></Row>
            <Row className="mt-5">
              <Col>
                <Button>
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
                  Respiration Rate: {respirationRate} (breath per minute)
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
