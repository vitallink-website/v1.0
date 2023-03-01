import { useContext, useEffect, useState, useRef } from "react";
import { DeviceContext } from "../../App";
import { Row, Form, Col } from "react-bootstrap";
import Diagram from "../Diagram/Diagram";
import { MeasureModal } from "./MeasureModal";
import { KEYS } from "../../utilities/bluetooth";

const init = {
  red: [],
  ecg: [],
  force: [],
  ir: [],
  pcg: [],
};
function MeasureBase({
  values,
  diagrams,
  command,
  action,
  texts,
  title,
  children,
}) {
  const bluetooth = useContext(DeviceContext);

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [data, setData] = useState(init);
  const [sampleTime, setTime] = useState(10);

  let temp = {
    red: [],
    ecg: [],
    force: [],
    ir: [],
    pcg: [],
  };

  const pendingTime = 5000;
  // here frequency is estimated, should be change after changing frequencies of device
  const startTime = useRef(null);
  const endTime = useRef(null);

  const hanldeCallback = (inputs) => {
    KEYS.map((key) => {
      if (values.includes(key)) {
        temp[key] = [...temp[key], ...inputs[key]];
      }
      return "";
    });
    if (temp[values[0]].length >= 100) {
    let cv = {
      red: temp.red,
      ecg: temp.ecg,
      force: temp.force,
      ir: temp.ir,
    };
    setData(cv);
  }
  };

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
        time: Math.ceil(bluetooth.GetTime()),
        freq: Math.ceil(
          (data[values[0]].length / (bluetooth.GetTime())) * 1000
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const startInput = () => {
    setLoading(true);
    temp = {
      red: [],
      ecg: [],
      force: [],
      ir: [],
      pcg: [],
    };
    setData(init);
    startTime.current = setTimeout(() => {
      setActive(1);
      setLoading(false);
      bluetooth.start();
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      setActive(-1);
    }, [sampleTime * 1000 + pendingTime]);
  };

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const getStreamOfData = (key) => {
    // console.log(
    //   "🚀 ~ file: MeasureBase.js:115 ~ getStreamOfData ~ key:",
    //   key,
    //   data
    // );
    if (
      data[key] &&
      data[key].length > (diagrams.length % 2 === 0 ? 201 : 401)
    ) {
      if (active === 1) {
        return data[key].slice(
          data[key].length - (diagrams.length % 2 === 0 ? 201 : 401),
          data[key].length
        );
      }
      if (active === -1) return data[key];
    }
    return [...new Array(diagrams.length % 2 === 0 ? 101 : 201).fill(0)];
  };
  // console.log(getStreamOfData());
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
              <Form.Text className="text-muted">{"> 5 seconds"}</Form.Text>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="my-4">
        {diagrams.map((key) => (
          <Col xs={12} sm={diagrams.length % 2 === 0 ? 6 : 12} key={key.name}>
            <Diagram
              dataKey={key.name}
              flow={getStreamOfData(key.name)}
              texts={texts}
              calculatedDots={key.calculatedDots}
            />
          </Col>
        ))}
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
