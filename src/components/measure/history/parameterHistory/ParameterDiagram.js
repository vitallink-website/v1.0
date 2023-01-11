import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Diagram from "../../../Diagram/Diagram";
import { useEffect, useState } from "react";

const ParameterDiagram = () => {
  const { type, data } = useParams();
  const [flow, setFlow] = useState([]);

  useEffect(() => {
    // type is the name of database
    // data is a key in table
    // type is the name of table
    // get table in here
    // map all data to  { id: "time" , value: caculated value(for example ECGheartbeat)}
    // eg: const temp = data.map(row => ({id: new Date(row.date),value:row.heartbeat}))
    // then set it in the flow : setFlow(temp)
    setFlow([]);
  }, []);

  return (
    <Container className="history-section">
      <Row>
        <Diagram dataKey={data} flow={flow} />
      </Row>
      <Row>
        <Col>
          <Link to="/Measure/History/ParameterHistory">
            <Button>Up</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ParameterDiagram;
