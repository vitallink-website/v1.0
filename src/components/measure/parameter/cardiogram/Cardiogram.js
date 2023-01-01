import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DeviceContext } from "../../../../App";
import Diagram from "../../../Diagram/Diagram";
import { RWebShare } from "react-web-share";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";
import userEvent from "@testing-library/user-event";

function Cardiogram() {
  const bluetooth = useContext(DeviceContext);

  const UserInfo = useContext(UserContext);
  const { add } = useIndexedDB("cardiogramData");
  const [user, setUser] = useState([]);  

  const [data, setData] = useState({
    ppg: [],
    ecg: [...new Array(200).fill(0)],
    force: [],
  });

  const [heartBeat, setHeartBeat] = useState(0);
  const [show, setShow] = useState(false);

  const [startSecond, setStart] = useState();
  const [active, setActive] = useState(false);

  const ecgs = [...new Array(200).fill(0)];

  useEffect(() => {
    bluetooth.sendCommand(0x02, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ecgs.push(ecg);
    if (ecgs.length > 1000) {
      setActive(false);
      stopInput(ecgs);
    }
    if (ecgs.length > 400) {
      setData({ ecg: ecgs.slice(400) });
    }
    if ([398, 399, 400, 401, 402, 403, 404].includes(ecgs.length)) {
      setActive(true);
    }
  };

  const startInput = () => {
    bluetooth.start();
    setStart(performance.now());
  };

  const stopInput = (ecgs) => {
    bluetooth.stop();
    const duration = performance.now() - startSecond;
    // eslint-disable-next-line no-undef
    // const heartBeat = HeartBeat(
    //   ecgs.slice(200, 1000),
    //   Math.round(duration / 1000)
    // );
    // setHeartBeat(heartBeat);

    const date = new Date();
    const showTime = date.getFullYear() + ' ' + date.getMonth() + ' ' + date.getDate()
        + ' '  +  date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();

    add({
      userId: UserInfo.id,
      ecgData: ecgs,
      date : showTime, 
      heartBeat: heartBeat
    }).then(
      (event) => {
        console.log("cardiogramData added: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
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
      <h2 className="measure-title">Cardiogram</h2>
      <Row style={{ display: "flex", alignItems: "center" }}>
        <Col sm={8}>
          <h5 className="measure-title">
            Please put your right and left fingers on ECG sensors and then press
          </h5>
        </Col>
        <Col sm={2}>
          <Button onClick={openModal}>Start</Button>
        </Col>
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
          <h5 style={{ color: "black" }}>
            Heartbeat: {Number(heartBeat).toFixed(2)} (bpm)
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
          <Button>Abnormality Detection</Button>
        </Col>
        <Col>
          <RWebShare
            data={{
              text: "Web Share - GfG",
              url: "http://localhost:3000",
              title: "GfG",
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button
              onClick={() => {
                setData({
                  ppg: [],
                  ecg: [],
                  force: [],
                });
              }}
            >
              output
            </Button>
          </RWebShare>
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

export default Cardiogram;
