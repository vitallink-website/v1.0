import React, { useContext, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import { useIndexedDB } from "react-indexed-db";
import { shareData } from "../../share/Share";
import { GetCurrentDateTime } from "../../../../utilities/time";
import MeasureBase from "../../../MeasureBase/MeasureBase";

const Oximetry = () => {
  const UserInfo = useContext(UserContext);

  const { add } = useIndexedDB("oximetryData");

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);

  const addToDB = (data, heartBeat) => {
    add({
      userId: UserInfo.id,
      ppgData: data,
      date: GetCurrentDateTime(),
      heartBeat: heartBeat,
      SPO2: 0,
    }).then(
      (event) => {
        console.log("oximetryData added: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const calculateBeatPerMinute = (inputs) => {
    // eslint-disable-next-line no-undef
    const heartBeat = HeartBeat_PPG(inputs.data, inputs.freq);

    // eslint-disable-next-line no-undef
    // const SPO2 = SpO2_estimation();

    // const Quality_index = Quality_PPG();

    console.log(heartBeat);
    setHeartBeat(Number(heartBeat).toFixed(2));
    // todo ? do toFixed here
    // setSPO2(SPO2);
    // setQualityIndex(Quality_index);
    addToDB(Number(heartBeat).toFixed(2));
  };

  return (
    <MeasureBase
      {...{
        name: "ppg",
        command: 0x01,
        action: calculateBeatPerMinute,
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
                      "Heart beat: " + Number(heartBeat).toFixed(2),
                      "SPO2: " + Number(SPO2).toFixed(2),
                      "Quality index: " + Number(qualityIndex).toFixed(2),
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
};

export default Oximetry;
