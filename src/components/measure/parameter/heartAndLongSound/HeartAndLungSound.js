import React from "react";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
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
  const [saved, setSaved] = useState(0);

  const flushDatas = () => {
    setSaved(0);
    setQualityIndex("");
    setHeartBeat("");
    setRespirationRate("");
  };

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

    return [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
      [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
      [4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
    ];

    // return [Array.from(signal_output[4]), //pcg_filtered
    //         Array.from(signal_output[5]), //heart_signal
    //         Array.from(signal_output[6]), //lung_signal
    //         Array.from(signal_output[7]), //heart_signal_snr
    //         Array.from(signal_output[8])];//lung_signal_snr
  }

  async function getDataAPI(data, fs) {
    let payload = {
      pcg: "[" + data.toString() + "]",
      fs: fs,
    };
    let res = await axios.post("http://127.0.0.1:5000//PCG_signal", payload);
    return res.data;
  }

  async function calculateBeatPerMinuteAPI(inputs) {
    console.log(inputs.data);
    return getDataAPI(inputs.data.pcg, inputs.freq).then((res) => {
      console.log(res);
      setHeartBeat(res.heart_rate);
      setRespirationRate(res.respiration_rate);
      setQualityIndex(res.lung_quality_ind);
      return [
        res.lung_signal_pre
          .slice(1, -1)
          .replace(/\n/g, " ")
          .split(/\b\s+/)
          .map(function (item) {
            return Number(item);
          }),
        res.heart_signal_pre
          .slice(1, -1)
          .replace(/\n/g, " ")
          .split(/\b\s+/)
          .map(function (item) {
            return Number(item);
          }),
        res.lung_signal
          .slice(1, -1)
          .replace(/\n/g, " ")
          .split(/\b\s+/)
          .map(function (item) {
            return Number(item);
          }),
        res.heart_signal
          .slice(1, -1)
          .replace(/\n/g, " ")
          .split(/\b\s+/)
          .map(function (item) {
            return Number(item);
          }),
        res.pcg_filtered
          .slice(1, -1)
          .replace(/\n/g, " ")
          .split(/\b\s+/)
          .map(function (item) {
            return Number(item);
          }),
      ];
    });
  }

  function handleChange(number, changeFilterShow) {
    setFilterActiveNum(number);
    changeFilterShow(number);
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
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Choose signal"
                >
                  <Dropdown.Item
                    onClick={() => handleChange(5, changeFilterShow)}
                    active={filterActiveNum === 5}
                  >
                    heart
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(4, changeFilterShow)}
                    active={filterActiveNum === 4}
                  >
                    heart with filter
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(3, changeFilterShow)}
                    active={filterActiveNum === 3}
                  >
                    lung
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(2, changeFilterShow)}
                    active={filterActiveNum === 2}
                  >
                    lung with filter
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(1, changeFilterShow)}
                    active={filterActiveNum === 1}
                  >
                    both with filter
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(0, changeFilterShow)}
                    active={filterActiveNum === 0}
                  >
                    both without filter
                  </Dropdown.Item>
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
