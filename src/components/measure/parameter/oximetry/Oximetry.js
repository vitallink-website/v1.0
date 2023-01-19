import React, { useContext, useEffect, useState, useRef } from "react";
import { Row, Col, Button, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Diagram from "../../../Diagram/Diagram";
import { useIndexedDB } from "react-indexed-db";
import { DeviceContext, UserContext } from "../../../../App";
import { GetCurrectDateTime } from "../../../../utilities/time";
import { shareData } from "../../share/Share";

const Oximetry = () => {
  const bluetooth = useContext(DeviceContext);
  const UserInfo = useContext(UserContext);

  const { add } = useIndexedDB("oximetryData");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    ppg: [...new Array(200).fill(0)],
  });

  const timer1 = useRef(null);
  const timer2 = useRef(null);

  const [heartBeat, setHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [startSecond, setStart] = useState();

  const [show, setShow] = useState(false);

  const [active, setActive] = useState(false);

  const ppgs = [...new Array(200).fill(0)];

  useEffect(() => {
    bluetooth.sendCommand(0x01, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth]);

  useEffect(() => {
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (active === false) stopInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const addToDB = (heartBeat) => {
    add({
      userId: UserInfo.id,
      ppgData: data.ppg,
      date: GetCurrectDateTime(),
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

  const hanldeCallback = ({ ppg, ecg, force }) => {
    ppgs.push(ppg);
    if (ppgs.length > 400) {
      setData({ ppg: ppgs.slice(400) });
    }
    if ([399, 400, 401].includes(ppgs.length)) {
      setActive(true);
      if (!timer1.current)
        timer1.current = setTimeout(() => {
          setActive(false);
        }, 35000);
    }
  };

  const startInput = () => {
    bluetooth.start();
    setStart(performance.now());
  };

  const stopInput = () => {
    bluetooth.stop();
    // eslint-disable-next-line no-undef
    const heartBeat = HeartBeat_PPG(
      data.ppg.slice(400),
      60
      // bluetooth.GetFrequency()
    );
    console.log(data.ppg);

    // eslint-disable-next-line no-undef
    // const SPO2 = SpO2_estimation();

    // // eslint-disable-next-line no-undef
    // const Quality_index = Quality_PPG();

    console.log(heartBeat);
    setHeartBeat(heartBeat);
    // setSPO2(SPO2);
    // setQualityIndex(Quality_index);
    addToDB(Number(heartBeat).toFixed(2));
  };

  const autoStart = () => {
    setLoading(true);
    startInput();
    timer2.current = setTimeout(() => {
      closeModal();
      setLoading(false);
    }, 4000);
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
              : [new Array(200).fill(0)]}
          texts = {[
            "Heart beat: " + Number(heartBeat).toFixed(2),
            "SPO2: " + Number(SPO2).toFixed(2),
            "Quality index: " + Number(qualityIndex).toFixed(2),
          ]}
        />
      </Row>
      <Row className="mt-5">
        <Col>
          <h5 style={{ color: "black" }}>
            Heart Rate: {Number(heartBeat).toFixed(2)} (bpm)
          </h5>
        </Col>
        <Col>
          <h5 style={{ color: "black" }}>
            SpO2: {Number(SPO2).toFixed(2)} (%)
          </h5>
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
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>How to start recording...</Modal.Title>
        </Modal.Header>
        {loading ? (
          <Modal.Body style={{ display: "flex", alignItems: "center" }}>
            Please Hold your finger until plotting starts!
            <Spinner animation="border" />
          </Modal.Body>
        ) : (
          <Modal.Body>
            Put your hand on the device, after calibration it start its process
          </Modal.Body>
        )}
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
