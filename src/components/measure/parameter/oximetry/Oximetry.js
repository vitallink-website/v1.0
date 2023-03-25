import React, { useState} from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import {useAddToDB} from "../../../../utilities/AddToDB";
import { FcCheckmark } from "react-icons/fc";

const Oximetry = () => {
  const dbFunc = useAddToDB("oximetryData");

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [saved, setSaved] = useState(0);
  
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

  const calculateBeatPerMinuteAPI = (inputs) => {
    console.log(inputs.data);
    // axios.post("address", {
    //   data: inputs.data,
    //   freq: inputs.freq,
    // })
    // .then((response) => console.log(response.data))
    // .then((error) => console.log(error));

    // axios.get("address", {

    // })
    // .then((response) => console.log(response.data))
    // .then((error) => console.log(error));   
  };


  function addToDB (){
    var dataParameter = {};
    dataParameter["heartBeatPPG"] = heartBeat;
    dataParameter["SPO2"] = SPO2;
    dbFunc.updateHistory(dataParameter);
    setSaved(1);
  }

  const flushDatas = () => setSaved(0)

  return (
    <MeasureBase
      {...{
        values: ["red", "ir", "force"],
        diagrams: [
          {
            name: "red",
            calculatedDots: [
            ],
          },
        ],
        command: 0x01,
        action: calculateBeatPerMinute,
        flushData: flushDatas,
        texts: [
          "Heart beat: " + heartBeat,
          "SPO2: " + SPO2,
          "Quality index: " + qualityIndex,
        ],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Oximetry</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your finger on PPG sensors and then press
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
                  <Button onClick={() => addToDB()} >Save {saved ? <FcCheckmark /> : "" }</Button>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
};

export default Oximetry;
