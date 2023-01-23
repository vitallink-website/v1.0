import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { DeviceContext, UserContext } from "../../../../App";
import Diagram from "../../../Diagram/Diagram";
import { GetCurrentDateTime } from "../../../../utilities/time";

// todo
// sync with cardiogram
function BPWithoutCalibration() {
  const bluetooth = useContext(DeviceContext);
  
  const [data, setData] = useState({
    ppg: [...new Array(200).fill(0)],
    ecg: [],
    force: [...new Array(200).fill(0)],
  });
  
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);

  const [SYS_DIA, setSYS_DIA] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  
  const ppgs = [...new Array(200).fill(0)];
  const forces = [...new Array(200).fill(0)];
  
  const UserInfo = useContext(UserContext);
  
  const { add } = useIndexedDB("BPData");

  const addToDB = () => {
    const showTime = GetCurrentDateTime();

    add({
      userId: UserInfo.id,
      ppgData: ppgs,
      forceData: forces,
      date: showTime,
      SYS_DIA: 0
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
    bluetooth.sendCommand(0x05, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ppgs.push(ppg);
    forces.push(force);
    if (ppgs.length > 1000) {
      setActive(false);
      stopInput(ppgs);
    }
    if (ppgs.length > 400) {
      setData({ ppg: ppgs.slice(400), force: forces.slice(400) });
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

    // eslint-disable-next-line no-undef
    // const SYS_DIA = BloodPressure()
    // 
    addToDB();

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
      <h2 className="measure-title">
        Blood Pressure Estimation without Calibration
      </h2>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col sm={8}>
          <h5 className="measure-title">
            Please put your finger on PPG and Force sensors and try to follow
            the force line by pressing the sensors
          </h5>
        </Col>
        <Col sm={2}>
          <Button onClick={openModal} disabled={data.ppg.length > 200}>Start</Button>
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
          dataKey={"force"}
          flow={
            data.force.length > 200
              ? active
                ? data.force.slice(data.force.length - 200, data.force.length)
                : data.force
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
          <h5 style={{ color: "black" }}>
            SYS/DIA: {Number(0.0).toFixed(2)} (mmHg)
          </h5>
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

export default BPWithoutCalibration;
