import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";
import { isEqualDays } from "../../../../utilities/time";

function TimeHistory() {
  const [ecgHeartBeat, setEcgHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [ppgHeartBeat, setPpgHeartBeat] = useState(0);
  const [SYS_DIA, setSYS_DIA] = useState([]);


  const [selectedDate, setSelectedDate] = useState("");

  const [cardiogramData, setCardiogramData] = useState([]);
  const [oximetryData, setOximetryData] = useState([]);
  const [BPData, setBPData] = useState([]);

  const UserInfo = useContext(UserContext);
  const { getAll: getAllCData } = useIndexedDB("cardiogramData");
  const { getAll: getAllOData } = useIndexedDB("oximetryData");
  const { getAll: getAllBPData } = useIndexedDB("BPData");

  useEffect(() => {
    getAllCData().then((dataFromDB) => {
      const result = dataFromDB.filter((temp) => temp.userId === UserInfo.id);
      setCardiogramData(result);
    });
  }, []);

  useEffect(() => {
    getAllOData().then((dataFromDB) => {
      const result = dataFromDB.filter((temp) => temp.userId === UserInfo.id);
      setOximetryData(result);
    });
  }, []);

  useEffect(() => {
    getAllBPData().then((dataFromDB) => {
      const result = dataFromDB.filter((temp) => temp.userId === UserInfo.id);
      setBPData(result);
    });
  }, []);

  function retrieveDate() {
    cardiogramData.map((cData) => {
      const historyDate = cData["date"];
      if (isEqualDays(selectedDate, historyDate))
        setEcgHeartBeat(cData["heartBeat"]);
    });

    oximetryData.map((oData) => {
      const historyDate = oData["date"];
      if (isEqualDays(selectedDate, historyDate))
        setPpgHeartBeat(oData["heartBeat"]);
      setSPO2(oData["SPO2"]);
    });

    BPData.map((bData) => {
      const historyDate = bData["date"];
      if (isEqualDays(selectedDate, historyDate))
          setSYS_DIA(bData["SYS_DIA"]);
    });
  }

  return (
    <div className="history-section">
      <h1 style={{ marginBottom: "50px" }}>Time History</h1>
      <Row>
        <Col xs={{ span: 2, offset: 1 }}>
          <Form.Group controlId="dob">
            <Form.Label>Select Start Date</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={retrieveDate}
          >
            Submit
          </Button>
        </Col>
        <Col xs={{ span: 6, offset: 1 }}>
          <Row className="time-history-row">
            <Col>
              <Row>Heart Rate(ppg): {ppgHeartBeat ? ppgHeartBeat : ""}</Row>
              <Row style={{ fontSize: "0.8rem" }}>(beat per minute)</Row>
            </Col>
            <Col>
              <Row>Heart Rate(ecg): {ecgHeartBeat ? ecgHeartBeat : ""}</Row>
              <Row style={{ fontSize: "0.8rem" }}>(beat per minute)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Blood Glucose</Row>
              <Row style={{ fontSize: "0.8rem" }}>(mg/dL)</Row>
            </Col>
            <Col>
              <Row>PR/RR Interval </Row>
              <Row style={{ fontSize: "0.8rem" }}>(msec)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Respiration Rate</Row>
              <Row style={{ fontSize: "0.8rem" }}>(breath per minute)</Row>
            </Col>
            <Col>
              <Row>QRS Duration</Row>
              <Row style={{ fontSize: "0.8rem" }}>(msec)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>SpO2: {SPO2 ? SPO2 : ""}</Row>
              <Row style={{ fontSize: "0.8rem" }}>(%)</Row>
            </Col>
            <Col>
              <Row>HR Variation</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Sys/DIA</Row>
              <Row style={{ fontSize: "0.8rem" }}>(mmHg)</Row>
            </Col>
            <Col>
              <Row>Temperature</Row>
              <Row style={{ fontSize: "0.8rem" }}>(‘C)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Lung Abnormality</Row>
            </Col>
            <Col>
              <Row>GSR</Row>
              <Row style={{ fontSize: "0.8rem" }}>(Siemens)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Heart Abnormality</Row>
            </Col>
            <Col>
              <Row>Arrythmia Type</Row>
            </Col>
          </Row>
        </Col>
        <Col xs={3}></Col>
      </Row>
      <Row>
        <Col>
          <Link to="/Measure/History">
            <Button size="sm"> Back</Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default TimeHistory;
