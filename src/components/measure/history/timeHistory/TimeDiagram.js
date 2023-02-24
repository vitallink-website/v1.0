import { Link, useParams } from "react-router-dom";
import Diagram from "../../../Diagram/Diagram";
import { DataContext } from "./ShowTimeData";
import { Button, Container, Col, Row } from "react-bootstrap";
import { useContext } from "react";

function TimeDiagram() {
  const data = useParams();
  const flow = useContext(DataContext);
  return (
      <Container className="history-section">
      <Row>
        {console.log(flow)}
        {/* <Diagram dataKey={data} flow={flow} texts="" /> */}
      </Row>
      <Row>
        <Col>
          <Link to="/Measure/History/timeHistory">
            <Button>Up</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default TimeDiagram;
