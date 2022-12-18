// import { Container, Row, Col, Button} from "react-bootstrap";
import Particle from "../Particle";
import { Row, Col, Button } from "react-bootstrap";
import React from "react";
import Home2 from "./Home2";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Particle />
      <div className="home-section">
        <Row>
          <Col>
            <Link to="/Register">
              <Button className="register-btn-inner" size="lg">
                {" "}
                Register your device
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/CreateUser">
              <Button className="register-btn-inner" size="lg">
                {" "}
                Select User
              </Button>
            </Link>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Home2 />
      </div>
    </div>
  );
}

export default Home;
