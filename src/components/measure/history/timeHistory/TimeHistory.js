import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import {
  convertStringToDateDB,
  GetDateTimeDB,
} from "../../../../utilities/time";

function TimeHistory() {
  const [data, setData] = useState(0);
  const [parameter, setParameter] = useState({});

  //pagination
  const [dates, setDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const UserInfo = useContext(UserContext);
  const { getAll: getAllData } = useIndexedDB("dataTime");

  useEffect(() => {
    getAllData().then((dataFromDB) => {
      const result = dataFromDB.filter((temp) => temp.userId === UserInfo.id);
      let dateAndIds = result.map((d) => d.dateAndId);
      const result2 = dateAndIds.map((d) => GetDateTimeDB(String(d)));
      setDates(result2);
      setData(result);
    });
  }, []);

  const retrieveDate = (currentDate) => {
    setActiveIndex(currentDate);
    setCurrentDate(currentDate);
    const dateAndId = parseInt(
      convertStringToDateDB(dates[currentDate], UserInfo.id)
    );
    const result = data.filter((temp) => temp.dateAndId === dateAndId);
    setParameter(result[0].parameters);
  };

  return (
    <div className="history-section">
      <h1 style={{ marginBottom: "50px" }}>Time History</h1>
      <Row>
        <Col xs={{ span: 2, offset: 1 }}>
          <Pagination style={{ display: "inline-block" }}>
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
            {[...Array(5)].map((currElement, index) => (
              <Pagination.Item
                key={currElement}
                onClick={() => retrieveDate(currentDate + index)}
                active={activeIndex === currentDate + index}
              >
                {dates[currentDate + index]}
              </Pagination.Item>
            ))}
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
              <Row>
                Heart Rate(ppg):{" "}
                {parameter.heartBeatPPG ? parameter.heartBeatPPG : ""}
              </Row>
              <Row style={{ fontSize: "0.8rem" }}>(beat per minute)</Row>
            </Col>
            <Col>
              <Row>
                Heart Rate(ecg):{" "}
                {parameter.heartBeatECG ? parameter.heartBeatECG : ""}
              </Row>
              <Row style={{ fontSize: "0.8rem" }}>(beat per minute)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Blood Glucose</Row>
              <Row style={{ fontSize: "0.8rem" }}>(mg/dL)</Row>
            </Col>
            <Col>
              <Row>
                PR/RR Interval{" "}
                {parameter.PR_RR_Interval ? parameter.PR_RR_Interval : ""}
              </Row>
              <Row style={{ fontSize: "0.8rem" }}>(msec)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>Respiration Rate</Row>
              <Row style={{ fontSize: "0.8rem" }}>(breath per minute)</Row>
            </Col>
            <Col>
              <Row>
                QRS Duration{" "}
                {parameter.QRS_Duration ? parameter.QRS_Duration : ""}
              </Row>
              <Row style={{ fontSize: "0.8rem" }}>(msec)</Row>
            </Col>
          </Row>
          <Row className="time-history-row">
            <Col>
              <Row>SpO2: {parameter.SPO2 ? parameter.SPO2 : ""}</Row>
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
