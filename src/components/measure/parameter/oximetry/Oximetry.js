import React, { useState } from "react";
import { Row, Col, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useAddToDB } from "../../../../utilities/AddToDB";
import { FcCheckmark } from "react-icons/fc";
import axios from "axios";
import Swal from "sweetalert2";

const Oximetry = () => {
  const dbFunc = useAddToDB("oximetryData");

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);
  const [filterActiveNum, setFilterActiveNum] = useState(0);

  const calculateBeatPerMinute = (inputs) => {
    console.log(inputs.data);

    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      PPG_signal_processing(inputs.data.ir, inputs.data.red, inputs.freq)
    ); // HeartRate, SpO2, Quality_index

    console.log(signal_output[0]);
    console.log(signal_output[1]);
    setHeartBeat(signal_output[0]);
    setSPO2(signal_output[1]);
    setQualityIndex(signal_output[2]);
  };

  async function calculateBeatPerMinuteAPI(inputs) {
    console.log(inputs.data);
    let payload = {
      IR: "[" + inputs.data.ir.toString() + "]",
      Red: "[" + inputs.data.red.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("http://127.0.0.1:5000//PPG_signal", payload);
    console.log(res.data);
    if (!Number(res.data.Try_Again)) {
      setHeartBeat(res.data.HeartRate);
      setSPO2(res.data.SpO2);
      setQualityIndex(res.data.Quality_index);
      return [
        res.data.clear_IR
          .slice(1, -1)
          .split(",")
          .map(function (item) {
            return Number(item);
          }),
          inputs.data.red,
          res.data.clear_Red
          .slice(1, -1)
          .split(",")
          .map(function (item) {
            return Number(item);
          })
      ];
    } else
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
      });
  }

  function addToDB() {
    var dataParameter = {};
    dataParameter["heartBeatPPG"] = heartBeat;
    dataParameter["SPO2"] = SPO2;
    dbFunc.updateHistory(dataParameter);
    setSaved(1);
  }

  const flushDatas = () => {
    setSaved(0);
    setHeartBeat("");
    setSPO2("");
    setQualityIndex("");
  };

  function handleChange(number, changeFilterShow) {
    setFilterActiveNum(number);
    changeFilterShow(number);
  }

  return (
    <MeasureBase
      {...{
        values: ["red", "ir", "force"],
        diagrams: [
          {
            name: "ir",
            calculatedDots: [],
          },
        ],
        command: 0x01,
        action: calculateBeatPerMinuteAPI,
        flushData: flushDatas,
        texts: [
          "Heart beat: " + heartBeat,
          "SPO2: " + SPO2,
          "Quality index: " + qualityIndex,
        ],
        title: (openModal, changeFilterShow, filterShow) => (
          <>
            <h2 className="measure-title">Oximetry</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={4}>
                <h5 className="measure-title">
                  Please put your finger on PPG sensors and then press
                </h5>
              </Col>
              <Col md={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
              <Col md={3}>
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Choose signal"
                >
                  <Dropdown.Item
                    onClick={() => handleChange(0, changeFilterShow)}
                    active={filterActiveNum === 0}
                  >
                    ir
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleChange(2, changeFilterShow)}
                    active={filterActiveNum === 2}
                  >
                    red
                  </Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col md={3}>
                <Button
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
            <Row className="mt-5">
              <Col>
                <h5 style={{ color: "black" }}>
                  Heart Rate: {heartBeat} (bpm)
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>SpO2: {SPO2} (%)</h5>
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
                      "SPO2: " + SPO2,
                      "Quality index: " + qualityIndex,
                    ]);
                  }}
                >
                  Output
                </Button>
              </Col>
              <Col>
                <Button onClick={() => addToDB()}>
                  Save {saved ? <FcCheckmark /> : ""}
                </Button>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
};

export default Oximetry;
