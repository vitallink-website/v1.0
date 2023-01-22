import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Dropdown,
  DropdownButton,
  Accordion,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";
import showTimeData from "./ShowTimeData";

function TimeHistory() {
  const [isInterval, setIsInterval] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [cardiogramData, setCardiogramData] = useState("");
  const [oximetryData, setOximetryData] = useState("");
  const [timeData, setTimeData] = useState([]);

  const UserInfo = useContext(UserContext);
  const { getAll: getAllCData } = useIndexedDB("cardiogramData");
  const { getAll: getAllOData } = useIndexedDB("oximetryData");

  useEffect(() => {
    getAllCData().then((dataFromDB) => {
      setCardiogramData(dataFromDB);
    });
  }, []);

  useEffect(() => {
    getAllOData().then((dataFromDB) => {
      setCardiogramData(dataFromDB);
    });
  }, []);

  function retrieveDate() {

    const d = cardiogramData[0]['date'];
    console.log(d);
    const d2 = new Date(cardiogramData[0]['date']);
    console.log(d2.getDate());
    setTimeData(cardiogramData);
  }

  function reverseData() {
    setIsInterval(!isInterval);
  }

  return (
    <div className="history-section">
      <h1 style={{ marginBottom: "50px" }}>Time History</h1>
      <Row style={{ marginBottom: "50px" }}>
        <Col xs={{ span: 2, offset: 1 }} style={{ marginTop: "35px" }}>
          <Form.Check
            id="switchEnabled"
            type="switch"
            checked={isInterval}
            onChange={reverseData}
            label="Interval"
          />
        </Col>
        <Col xs={{ span: 3 }}>
          <Form.Group controlId="dob">
            <Form.Label>Select Start Date</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              placeholder="Date of Birth"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={{ span: 3 }}>
          <Form.Group controlId="dob" className="e-disabled">
            <Form.Label>Select End Date</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              disabled={isInterval ? false : true}
              placeholder="Date of Birth"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={{ span: 1 }}>
          <Button
            variant="primary"
            type="submit"
            className="sm"
            onClick={retrieveDate}
          >
            Submit
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 6, offset: 3 }}>
          <Accordion defaultActiveKey="0">
            {timeData.map((data) => (
              <Accordion.Item key={data.id} eventKey={String(data.id)}>
                {showTimeData(data)}
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </div>
  );
}

export default TimeHistory;
