import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Measure({username}) {
  return (
    <div className="measure-section">
      <Container className="measure">
        <Row>
          <h1 className="measure-title"> Welcome {username}</h1>
        </Row>
        <Row>
          <Col>
            <Link to="/Measure/Measurement" className="measure-btn-link">
              <Button className="measure-btn"> Measurement </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/Measure/History" className="measure-btn-link">
              <Button className="measure-btn"> History </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Measure;
