import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HistoryDiagram from "../../../Diagram/HistoryDiagram";
import { useEffect, useState, useContext } from "react";
import { useIndexedDB } from "react-indexed-db";
import { UserContext } from "../../../../App";
import { GetDateTimeDB } from "../../../../utilities/time";

const ParameterDiagram = () => {
  const { type, data } = useParams();

  const [flow, setFlow] = useState([]);
  const UserInfo = useContext(UserContext);
  
  const { getAll } = useIndexedDB(type);
  useEffect(() => {
    console.log("in parameter diagram" + UserInfo.id);
    getAll().then(dataFromDB => {
      const result = dataFromDB.filter(temp => temp.userId === UserInfo.id);
      let tempFlow = [];
      result.map((res) => tempFlow.push({'date' : GetDateTimeDB(String(res['dateAndId'])), 'value': res[data]}));
      setFlow(tempFlow);
    });

  }, []);

  return (
    <Container className="history-section">
      <Row>
        <HistoryDiagram dataKey={data} flow={flow} texts = "" />
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
