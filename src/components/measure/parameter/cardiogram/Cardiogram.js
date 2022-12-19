import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeviceContext } from "../../../../App";
import Diagram from "../../../Diagram/Diagram";

function Cardiogram() {
  const bluetooth = useContext(DeviceContext);

  const [data, setData] = useState({
    ppg: [],
    ecg: [],
    force: [],
  });

  // const [heartBeat, setHeartBeat] = useState(0);
  const [startSecond, setStart] = useState();
  const [active, setActive] = useState(false);

  const ppgs = [];
  const ecgs = [];
  const forces = [];

  useEffect(() => {
    if (!bluetooth.channelConnected) {
      bluetooth.sendCommand(0x03, hanldeCallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ppgs.push(ppg);
    ecgs.push(ecg);
    forces.push(force);
    setData({ ppg: ppgs, ecg: ecgs, force: forces });
  };

  const startInput = () => {
    bluetooth.start();
    setStart(performance.now());
  };
  const stopInput = () => {
    bluetooth.stop();
    const duration = performance.now() - startSecond;
    console.log(Math.round(duration / 1000), duration);
    console.log(data);
    const heartBeat = HeartBeat(ecg, Math.round(duration / 1000));
    setHeartBeat(heartBeat);
  };

  const autoStart = () => {
    !active ? startInput() : stopInput();
    setActive(!active);
  };

  return (
    <div className="measure-section">
      <br />
      <br />
      <h2 className="measure-title">Cardiogram</h2>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col sm={8}>
          <h5 className="measure-title">
            Please put your right and left fingers on ECG sensors and then press
          </h5>
        </Col>
        <Col sm={2}>
          <Button onClick={autoStart}>{!active ? "Start" : "Stop"}</Button>
        </Col>
      </Row>
      <Row>
        <Diagram dataKey={"ecg"} flow={data.ecg} />
      </Row>
      <Row className="measure-button-row">
        <Col>
          <Link to="/Measure/Measurement">
            <Button> Back</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <Button> Output</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <Button> Save</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default Cardiogram;
