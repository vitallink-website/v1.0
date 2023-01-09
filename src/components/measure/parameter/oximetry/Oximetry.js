import React, { useContext, useEffect, useState, useRef } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Diagram from "../../../Diagram/Diagram";
import { useIndexedDB } from "react-indexed-db";
import { DeviceContext, UserContext } from "../../../../App";

const Oximetry = () => {
  const bluetooth = useContext(DeviceContext);

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [startSecond, setStart] = useState();

  const [data, setData] = useState({
    ppg: [...new Array(200).fill(0)],
    ecg: [],
    force: [],
  });
  const timer1 = useRef(null);
  const timer2 = useRef(null);

  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);

  const ppgs = [...new Array(200).fill(0)];

  const UserInfo = useContext(UserContext);
  const { add } = useIndexedDB("oximetryData");

  const addToDB = () => {
    const date = new Date();
    const showTime =
      date.getFullYear() +
      " " +
      date.getMonth() +
      " " +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    add({
      userId: UserInfo.id,
      ppgData: ppgs,
      date: showTime,
      heartBeat: 0,
      SPO2: 0
    }).then(
      (event) => {
        console.log("oximetryData added: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    bluetooth.sendCommand(0x01, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);
  useEffect(() => {
    // Clear the interval when the component unmounts
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ppgs.push(ppg);
    if (ppgs.length > 1000) {
      setActive(false);
      stopInput(ppgs);
    }
    if (ppgs.length > 400) {
      setData({ ppg: ppgs.slice(400) });
    }
    if ([398, 399, 400, 401, 402, 403, 404].includes(ppgs.length)) {
      setActive(true);
      if (!timer1.current)
        timer1.current = setTimeout(() => {
          setActive(false);
        }, 32000);
    }
  };

  const startInput = () => {
    setStart(performance.now());
    console.log("start second ",startSecond);
    bluetooth.start();
  };

  const stopInput = () => {
    bluetooth.stop();
    console.log(startSecond);
    const duration = performance.now() - startSecond;
    console.log(duration);
    console.log(ppgs);
    // eslint-disable-next-line no-undef
    const heartBeat = HeartBeat_PPG(
      ppgs.slice(300, 1200),
      // Math.round(duration / 1000)
      60
    );

    // eslint-disable-next-line no-undef
    const SPO2 = SpO2_estimation();
    
    // eslint-disable-next-line no-undef
    const Quality_index = Quality_PPG();

    console.log(heartBeat);
    setHeartBeat(heartBeat);
    setSPO2(SPO2);
    setQualityIndex(Quality_index);
    // addToDB();
  };

  const autoStart = () => {
    startInput();
    closeModal();
  };

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  return (
    <div className="measure-section">
      <br />
      <br />
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
      <Row>
        <Diagram
          dataKey={"ppg"}
          flow={
            data.ppg.length > 200
              ? active
                ? data.ppg.slice(data.ppg.length - 200, data.ppg.length)
                : data.ppg
              : [new Array(200).fill(0)]
          }
        />
      </Row>
      <Row className="mt-5">
        <Col>
          <h5 style={{ color: "black" }}>
            Heart Rate: {Number(heartBeat).toFixed(2)} (bpm)
          </h5>
        </Col>
        <Col>
          <h5 style={{ color: "black" }}>SpO2: {Number(SPO2).toFixed(2)} (%)</h5>
        </Col>
        <Col>
          <h5 style={{ color: "black" }}>
            Quality Index: {Number(qualityIndex).toFixed(2)} (%)
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
              setData({
                ppg: [],
                ecg: [],
                force: [],
              });
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
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>How to start recording...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Put your hand on the device, after calibration it start its process
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={autoStart}>
            Let`s go!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Oximetry;
