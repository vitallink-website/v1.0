import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import { useIndexedDB } from "react-indexed-db";
import { shareData } from "../../share/Share";
import { GetCurrentDateTimeDB } from "../../../../utilities/time";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import AddToDB from "../../../../utilities/AddToDB";

const Oximetry = () => {
  const UserInfo = useContext(UserContext);

  const { update: updateParameterHistory } = useIndexedDB("oximetryData");
  const { getByID, update: updateTimeHistory } = useIndexedDB("dataTime");

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);

  const dump1 = 240;
  const dump2 = 100;

  useEffect(() => {
    const currentDate = GetCurrentDateTimeDB();
    const id = currentDate + UserInfo.id;
    console.log(id);
    getByID(id).then(
      (data) => {
        console.log(data);
        UserInfo.setParameters({
          parameters: data.parameters,
          userId: data.userId,
        });
      },
      (error) => {
        console.log(error);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToDB = (heartBeat, SPO2) => {
    const currentDate = GetCurrentDateTimeDB();
    const id = parseInt(String(currentDate + UserInfo.id));
    console.log("parameter: " + JSON.stringify(UserInfo.parameters));

    updateParameterHistory({
      dateAndId: id,
      userId: UserInfo.id,
      heartBeatPPG: heartBeat,
      SPO2: SPO2,
    }).then(
      (event) => {
        console.log("oximetryData updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );

    var newParameter = UserInfo.parameters;
    newParameter['heartBeatPPG'] = heartBeat;
    newParameter['SPO2'] = SPO2;

    updateTimeHistory({
      dateAndId: id,
      userId: UserInfo.id,
      parameters: newParameter,
    }).then(
      (event) => {
        console.log("timeData updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

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
    
    // var newParameter = UserInfo.parameters;
    // var dataParameter = {};
    // newParameter["heartBeatPPG"] = dump1//signal_output[0];
    // newParameter["SPO2"] = dump2//signal_output[1];
    // dataParameter["heartBeatPPG"] = dump1//signal_output[0];
    // dataParameter["SPO2"] = dump2//signal_output[1];
    // AddToDB("oximetryData", dataParameter, newParameter);
  };

  return (
    <MeasureBase
      {...{
        values: ["red", "ir", "force"],
        diagrams: [
          {
            name: "red",
            calculatedDots: [
              { name: "q", value: { x: 100, y: 4175 }, color: "red" },
              { name: "y", value: { x: 150, y: 14175 }, color: "blue" },
            ],
          },
        ],
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
                <Link to="/">
                  <Button>Save</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={() => addToDB(dump1, dump2)}>Add To DB</Button>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
};

export default Oximetry;
