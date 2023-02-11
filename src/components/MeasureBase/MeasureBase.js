import { useContext, useEffect, useState, useRef } from "react";
import { DeviceContext } from "../../App";
import { Row, Form, Col } from "react-bootstrap";
import Diagram from "../Diagram/Diagram";
import { MeasureModal } from "./MeasureModal";

function MeasureBase({ name, command, action, texts, title, children }) {
  const bluetooth = useContext(DeviceContext);

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [sampleTime, setTime] = useState(10);

  const temp = [];

  const pendingTime = 5000;
  const sample = 198 * 5;
  const startTime = useRef(null);
  const endTime = useRef(null);

  useEffect(() => {
    if (bluetooth && command) bluetooth.sendCommand(command, hanldeCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bluetooth, command]);

  useEffect(() => {
    return () => {
      clearTimeout(startTime);
      clearTimeout(endTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (active === 1) {
      closeModal();
      setLoading(false);
    } else if (active === -1) {
      bluetooth.stop();
      action({
        data: data,
        time: bluetooth.GetTime() - pendingTime,
        freq: bluetooth.GetFrequency(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const hanldeCallback = (inputs) => {
    temp.push(inputs[name]);
    if (temp.length >= sample) {
      setData(temp.slice(sample));
    }
  };

  const startInput = () => {
    bluetooth.start();
    startTime.current = setTimeout(() => {
      setActive(1);
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      setActive(-1);
    }, [sampleTime * 1000 + pendingTime]);
  };

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const getStreamOfData = () => {
    if (data.length > 201) {
      if (active === 1) {
        return data.slice(data.length - 201, data.length);
      }
      if (active === -1) return data;
    }
    return [...new Array(201).fill(0)];
  };

  return (
    <div className="measure-section">
      <br />
      <br />
      <Row className="align-items-center">
        <Col xs={12} sm={10}>
          {title(openModal)}
        </Col>
        <Col xs={12} sm={2}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sample Time</Form.Label>
              <Form.Control
                onChange={(e) => setTime(e.target.value)}
                type="number"
                placeholder="Enter seconds"
                value={sampleTime}
              />
              <Form.Text className="text-muted">
                must be more than 5 seconds{" "}
              </Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Diagram dataKey={name} flow={getStreamOfData()} texts={texts} />
      </Row>
      {children()}
      <MeasureModal
        loading={loading}
        show={show}
        closeModal={closeModal}
        autoStart={startInput}
      />
    </div>
  );
}

export default MeasureBase;
