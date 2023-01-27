import React, { useContext, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import { useIndexedDB } from "react-indexed-db";
import { shareData } from "../../share/Share";
import { GetCurrentDateTime } from "../../../../utilities/time";
import MeasureBase from "../../../MeasureBase/MeasureBase";

function Cardiogram() {
  const UserInfo = useContext(UserContext);

  const { add } = useIndexedDB("cardiogramData");

  const [heartBeat, setHeartBeat] = useState(0);

  const addToDB = (data, heartBeat) => {
    add({
      userId: UserInfo.id,
      ecgData: data,
      date: GetCurrentDateTime(),
      heartBeat: heartBeat,
      PRRRInterval: 0,
      QRSDuration: 0,
    }).then(
      (event) => {
        console.log("cardiogramData added: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const calculateBeatPerMinute = (inputs) => {
    // eslint-disable-next-line no-undef
    const heartBeat = HeartBeat_ECG(inputs.data, inputs.freq);
    // const Quality_index = Quality_ECG(data.ecg.slice(400), fs);
    // setQualityIndex(Quality_index);

    console.log(heartBeat);
    setHeartBeat(Number(heartBeat).toFixed(2));
    addToDB(inputs.data, Number(heartBeat).toFixed(2));
  };

  return (
    <MeasureBase
      {...{
        name: "ecg",
        command: 0x02,
        action: calculateBeatPerMinute,
        texts: ["Heart beat: " + heartBeat],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Cardiogram</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your right and left fingers on ECG sensors and then
                  press
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
            <Row className="measure-button-row">
              <Col>
                <h5 style={{ color: "black" }}>Heartbeat: {heartBeat} (bpm)</h5>
              </Col>
            </Row>
            <Row className="measure-button-row">
              <Col>
                <Link to="/Measure/Measurement">
                  <Button> Back</Button>
                </Link>
              </Col>
              <Col>
                <Link to="/Measure/Measurement/Cardiogram/AbnormalityDetection">
                  <Button>Abnormality Detection</Button>
                </Link>
              </Col>
              <Col>
                <Button
                  onClick={() =>
                    shareData("CardiogramData", ["Heart beat: " + heartBeat])
                  }
                >
                  output
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

export default Cardiogram;
