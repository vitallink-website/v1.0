import React from "react";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link, useAsyncError } from "react-router-dom";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useState } from "react";
import { shareData } from "../../share/Share";
import { AiFillPlayCircle } from "react-icons/ai";
import { useAddToDB } from "../../../../utilities/AddToDB";
import axios from "axios";

function HeartAndLungSound() {
  const [sound, setSound] = useState([]);
  const [filterdSound, setFilterdSound] = useState([]);
  const [heartSound, setHeartSound] = useState([]);
  const [preHeartSound, setPreHeartSound] = useState([]);
  const [lungSound, setLungSound] = useState([]);
  const [preLungSound, setPreLungSound] = useState([]);

  const [heartBeat, setHeartBeat] = useState(0);
  const [respirationRate, setRespirationRate] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const dbFunc = useAddToDB("PCGData");
  const [filterActiveNum, setFilterActiveNum] = useState(0);
  const [saved, setSaved] = useState(0);
  const [fs, setFs] = useState(0);
  const [position, setPosition] = useState("heart");

  const flushDatas = () => {
    setSaved(0);
    setQualityIndex("");
    setHeartBeat("");
    setRespirationRate("");
  };

  function makeArrayFormString(arr) {
    return arr.slice(1, -1)
    .replace(/\n/g, " ")
    .split(/\b\s+/)
    .map(function (item) {
      return Number(item);
    });
  }

  async function calculate(inputs) {
    console.log(inputs.data);
    let payload = {
      pcg: "[" + inputs.data.pcg + "]",
      fs: inputs.freq,
    };
    let res = await axios.post(
      "http://127.0.0.1:5000//PCG_signal/heart",
      payload
    );
    console.log(res);
  }

  async function getDataAPI(data, fs) {
    let payload = {
      pcg: "[" + data.toString() + "]",
      fs: fs,
    };
    let addr =
      position === "heart"
        ? "http://127.0.0.1:5000//PCG_signal/heart"
        : "http://127.0.0.1:5000//PCG_signal/optional";
    let res = await axios.post(addr, payload);
    return res.data;
  }

  async function calculateBeatPerMinuteAPI(inputs) {
    console.log(inputs.data);
    setSound(inputs.data.pcg);
    setFs(inputs.freq);
    return getDataAPI(inputs.data.pcg, inputs.freq).then((res) => {
      console.log(res);
      setHeartBeat(res.heart_rate);
      setRespirationRate(res.respiration_rate);
      setQualityIndex(res.lung_quality_ind);
      const filterdSound = makeArrayFormString(res.pcg_filtered);
      const preHeartSound = makeArrayFormString(res.heart_signal_pre);
      const heartSound = makeArrayFormString(res.heart_signal);
      const preLungSound = makeArrayFormString(res.lung_signal_pre);
      const lungSound = makeArrayFormString(res.lung_signal);
      setFilterdSound(filterdSound);
      setPreHeartSound(preHeartSound);
      setHeartSound(heartSound);
      setPreLungSound(preLungSound);
      setLungSound(lungSound);
      return [filterdSound, preHeartSound, heartSound, preLungSound, lungSound];
    });
  }

  function handleChange(number, changeFilterShow) {
    setFilterActiveNum(number);
    changeFilterShow(number);
  }

  async function playAudio() {
    const finalSound =
      filterActiveNum === 0
        ? sound
        : filterActiveNum === 1
        ? filterdSound
        : filterActiveNum === 2
        ? preHeartSound
        : filterActiveNum === 3
        ? heartSound
        : filterActiveNum === 4
        ? preLungSound
        : filterActiveNum === 5
        ? lungSound
        : sound;
    console.log(finalSound);
    let payload = {
      sound: "[" + finalSound.toString() + "]",
      fs: fs,
    };
    let res = await axios.post("http://127.0.0.1:5000/rcv_audio", payload);
    if (res.statusText === "OK") {
      const { data } = await axios.get("http://127.0.0.1:5000/snd_audio", {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "audio/x-wav",
        },
      });
      const blob = new Blob([data], {
        type: "audio/x-wav",
      });
      const url = URL.createObjectURL(blob);
      let audio = new Audio(url);
      audio.play();
    }
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
        flushData: flushDatas,
        texts: ["Heart beat: " + heartBeat, "Quality index: " + qualityIndex],
        title: (openModal, changeFilterShow) => (
          <>
            <h2 className="measure-title">Heart and Lung Sound</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col md={2}>
                <h5 className="measure-title">
                  put the microphone on your heart position and press
                </h5>
              </Col>
              <Col md={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
              <Col md={2}>
                <DropdownButton id="dropdown-basic-button" title="Position">
                  <Dropdown.Item
                    active={position === "heart"}
                    onClick={() => setPosition("heart")}
                  >
                    heart
                  </Dropdown.Item>
                  <Dropdown.Item
                    active={position === "optional"}
                    onClick={() => setPosition("optional")}
                  >
                    optional
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col md={3}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Choose signal"
                  disabled={heartBeat === ""}
                >
                  <Dropdown.Item
                    onClick={() => handleChange(4, changeFilterShow)}
                    active={filterActiveNum === 4 || filterActiveNum === 5}
                  >
                    heart
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(2, changeFilterShow)}
                    active={filterActiveNum === 2 || filterActiveNum === 3}
                  >
                    lung
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(0, changeFilterShow)}
                    active={filterActiveNum === 0 || filterActiveNum === 1}
                  >
                    both
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col md={3}>
                <Button
                  disabled={heartBeat === ""}
                  onClick={() =>
                    handleChange(
                      filterActiveNum % 2
                        ? filterActiveNum - 1
                        : filterActiveNum + 1,
                      changeFilterShow
                    )
                  }
                >
                  {filterActiveNum % 2 ? "Filterd" : "main"} signal
                </Button>
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
