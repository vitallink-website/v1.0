// import { Container, Row, Col, Button} from "react-bootstrap";
import Particle from "../Particle";
import { Row, Col, Button } from "react-bootstrap";
import React from "react";
import Home2 from "./Home2";

import { DBConfig } from "../DBConfig/DBConfig";
import { initDB } from "react-indexed-db";

initDB(DBConfig);

function Home() {

  return (
    <div>
        <Particle/>
        <div class="home-section">
          <Row>
            <Col>
              <Button href="/Register" className="register-btn-inner" size="lg">
                Register your device
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button href="/CreateUser" className="register-btn-inner" size="lg">
                Select User
              </Button>
            </Col>
          </Row>
          <br /><br /><br />
          <Home2 />
        </div>
      </div>
    );
  }
  
  export default Home;