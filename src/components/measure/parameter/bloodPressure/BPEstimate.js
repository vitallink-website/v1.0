import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Diagram from "../../../Diagram/Diagram";
import { useIndexedDB } from "react-indexed-db";
import { DeviceContext, UserContext } from "../../../../App";

function BPEstimate() {
  const bluetooth = useContext(DeviceContext);

  const [data, setData] = useState({
    ppg: [...new Array(200).fill(0)],
    ecg: [...new Array(200).fill(0)],
    force: [],
  });

  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);

  const ppgs = [...new Array(200).fill(0)];
  const ecgs = [...new Array(200).fill(0)];

  const UserInfo = useContext(UserContext);
  const { add } = useIndexedDB("BPData");
  
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
      forceData: 0,
      date: showTime,
      SYS: 0,
      DIA: 0
    }).then(
      (event) => {
        console.log("BP added: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    bluetooth.sendCommand(0x03, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ppgs.push(ppg);
    ecgs.push(ecg);

    if (ppgs.length > 1000) {
      setActive(false);
      stopInput(ppgs);
    }
    if (ppgs.length > 400) {
      setData({ ppg: ppgs.slice(400), ecg: ecgs.slice(400) });
    }
    if ([398, 399, 400, 401, 402, 403, 404].includes(ppgs.length)) {
      setActive(true);
    }
  };

  const startInput = () => {
    bluetooth.start();
  };

  const stopInput = () => {
    bluetooth.stop();
    addToDB()
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
      <h2 className="measure-title">Estimation Process</h2>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col sm={8}>
          <h5 className="measure-title">
          Please put your fingers on PPG and ECG sensors and then press
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
      <Row>
        <Diagram
          dataKey={"ecg"}
          flow={
            data.ecg.length > 200
              ? active
                ? data.ecg.slice(data.ecg.length - 200, data.ecg.length)
                : data.ecg
              : [new Array(200).fill(0)]
          }
        />
      </Row>
      <Row className="measure-button-row">
        <Col>
          <Link to="/Measure/Measurement">
            <Button> Back</Button>
          </Link>
        </Col>
        <Col>
          <h5 style={{ color: "black" }}>Enter Sys/DIA (mmHg)</h5>
        </Col>
        <Col>
          <h5 style={{ color: "black" }}>
            Quality Index: {Number(0.0).toFixed(2)} (%)
          </h5>
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
}

export default BPEstimate;
