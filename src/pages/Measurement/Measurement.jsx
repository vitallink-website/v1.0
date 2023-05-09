import React from "react";
import "../../assets/styles/Measurement.css";
import { Col, Row, Card, Image } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import topPhoto from "../../assets/icon/doctor_photo.svg";
import carIcon from "../../assets/icon/cardiogram_icon.svg";
import oxIcon from "../../assets/icon/oximetry_icon.svg";
import soundIcon from "../../assets/icon/heart_lung_sound_icon.svg";
import temeperatureIcon from "../../assets/icon/temeperature_icon.svg";
import bpIcon from "../../assets/icon/blood_pressure_icon.svg";

import Profile from "../Sidebar/profile";

function Measurement() {
  return (
    <div className="box">
      <Profile />
      <Row>
        <Col className="sidebar" md={1} >
          <Sidebar />
        </Col>
        <Col md={7} lg={9}>
          <Row>
            <h2 className="title-name">Measurement</h2>
          </Row>
          <Row>
            <Image src={topPhoto} className="top-img" />
          </Row>
          <Row>
            <Col lg={4} sm = {6}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <Image src={carIcon} />{" "}
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Cardiogram</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} sm = {6} >
              <Card>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <Image src={oxIcon} />{" "}
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Oximetry</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} sm = {6}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <Image src={soundIcon} />{" "}
                  </Card.Title>
                  <Card.Text>
                    <div className="record-text">records of</div>
                    <div>Heart Lung Sound</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} sm = {6}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <Image src={bpIcon} />{" "}
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Blood Pressure</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} sm = {6} >
              <Card>
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <Image src={temeperatureIcon} />{" "}
                  </Card.Title>
                  <div className="record-text">records of</div>
                  <Card.Text>Temperature</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Measurement;
