import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";
import { isEqualDays } from "../../../../utilities/time";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

function TimeHistory() {
  const [ecgHeartBeat, setEcgHeartBeat] = useState(0);
  const [SPO2, setSPO2] = useState(0);
  const [ppgHeartBeat, setPpgHeartBeat] = useState(0);
  const [SYS_DIA, setSYS_DIA] = useState([]);

  //pagination
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(0);

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
      const resDate = [];
      result.map((res) => resDate.push(String(res["date"]).split(" ")[0]));
      resDate.map((resD) => setDates((dates) => [...dates, resD]));
    });
  }, []);

  useEffect(() => {
    getAllOData().then((dataFromDB) => {
      const result = dataFromDB.filter((temp) => temp.userId === UserInfo.id);
      setOximetryData(result);
      const resDate = [];
      result.map((res) => resDate.push(String(res["date"]).split(" ")[0]));
      resDate.map((resD) => setDates((dates) => [...dates, resD]));
    });
  }, []);

  useEffect(() => {
    getAllBPData().then((dataFromDB) => {
      const result = dataFromDB.filter((temp) => temp.userId === UserInfo.id);
      setBPData(result);
      const resDate = [];
      result.map((res) => resDate.push(String(res["date"]).split(" ")[0]));
      resDate.map((resD) => setDates((dates) => [...dates, resD]));
    });
  }, []);

  useEffect(() => {
    const uniqueDates = Array.from(new Set(dates));
    setDates(uniqueDates);
  }, [dates])

  function retrieveDate() {
    console.log(dates);
    console.log("hi :)" + currentDate);
    // cardiogramData.map((cData) => {
    //   const historyDate = cData["date"];
    //   if (isEqualDays(dates[currentDate], historyDate))
    //     setEcgHeartBeat(cData["heartBeat"]);
    // });

    // oximetryData.map((oData) => {
    //   const historyDate = oData["date"];
    //   if (isEqualDays(dates[currentDate], historyDate)) {
    //     setPpgHeartBeat(oData["heartBeat"]);
    //     setSPO2(oData["SPO2"]);
    //   }
    // });

    // BPData.map((bData) => {
    //   const historyDate = bData["date"];
    //   if (isEqualDays(currentDate, historyDate)) setSYS_DIA(bData["SYS_DIA"]);
    // });
  }

  return (
    <div className="history-section">
      <h1 style={{ marginBottom: "50px" }}>Time History</h1>
      <Row>
        <Col xs={{ span: 2, offset: 1 }}>
          <Pagination
            style={{ display: "inline-block" }}
            onClick={retrieveDate()}
          >
            <Pagination.First onClick={() => setCurrentDate(0)}>
              <FaAngleDoubleUp />
            </Pagination.First>
            <Pagination.Prev
              onClick={() =>
                currentDate - 1 >= 0
                  ? setCurrentDate(currentDate - 1)
                  : setCurrentDate(currentDate)
              }
            >
              <AiFillCaretUp />
            </Pagination.Prev>
            {/* {[...Array(7)].map(function(i){
                <Pagination.Item onClick={() => setCurrentDate(currentDate)} active = {i==0}>{console.log("hry " + {currentDate} + dates[5])}{dates[currentDate + i]}</Pagination.Item>
            })} */}
            <Pagination.Item onClick={() => setCurrentDate(currentDate)} active>{dates[currentDate]}</Pagination.Item>
            <Pagination.Item onClick={() => setCurrentDate(currentDate)} >{dates[currentDate + 1]}</Pagination.Item>
            <Pagination.Item onClick={() => setCurrentDate(currentDate)} >{dates[currentDate + 2]}</Pagination.Item>
            <Pagination.Item onClick={() => setCurrentDate(currentDate)} >{dates[currentDate + 3]}</Pagination.Item>
            <Pagination.Item onClick={() => setCurrentDate(currentDate)} >{dates[currentDate + 4]}</Pagination.Item>
            <Pagination.Next
              onClick={() => {
                currentDate + 1 < dates.length
                  ? setCurrentDate(currentDate + 1)
                  : setCurrentDate(currentDate);
              }}
            >
              <AiFillCaretDown />
            </Pagination.Next>
            <Pagination.Last onClick={() => setCurrentDate(dates.length - 1)}>
              <FaAngleDoubleDown />
            </Pagination.Last>
          </Pagination>
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
