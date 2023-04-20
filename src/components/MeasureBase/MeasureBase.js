import { useContext, useEffect, useState, useRef } from "react";
import { DeviceContext } from "../../App";
import { Row, Form, Col } from "react-bootstrap";
import Diagram from "../Diagram/Diagram";
import { MeasureModal } from "./MeasureModal";
import { BlutoothModal } from "./BlutoothModal";
import { KEYS } from "../../utilities/bluetooth";

const init = {
  red: [],
  ecg: [],
  force: [],
  ir: [],
  pcg: [],
  temperature: [],
};
function MeasureBase({
  values,
  diagrams,
  command,
  action,
  flushData,
  texts,
  title,
  children,
}) {
  const bluetooth = useContext(DeviceContext);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const [data, setData] = useState(init);
  const [filteredData, setFilteredData] = useState();
  const [sampleTime, setTime] = useState(10);

  const [funcCall, setFuncCall] = useState(false);

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const [filterShow, setFilterShow] = useState(0);
  const changeFilterShow = (number) => {
    active === 0 ? setFilterShow(number) : setFilterShow(0);
  };
  const [bluShow, setBluShow] = useState(true);
  const closeBluModal = () => setBluShow(false);

  const [scale, setScale] = useState(
    values.includes("pcg") ? 50001 : diagrams.length % 2 === 0 ? 4001 : 401
  );
  const [forceScale, setForceScale] = useState(0);
  let temp = {
    red: [],
    ecg: [],
    force: [],
    ir: [],
    pcg: [],
    temperature: [],
  };

  const pendingTime = 5000;
  const startTime = useRef(null);
  const endTime = useRef(null);

  const hanldeCallback = (inputs) => {
    if (active === 1) {
      KEYS.map((key) => {
        if (values.includes(key)) {
          temp[key] = [...temp[key], ...inputs[key]];
        }
        return "";
      });
      setData({
        red: temp.red,
        ecg: temp.ecg,
        force: temp.force,
        ir: temp.ir,
        pcg: temp.pcg,
        temperature: temp.temperature,
      });
    }
    else if(active === 0) {
      setFuncCall(1);
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
    hanldeCallback(data);
    if (active === 1) {
      closeModal();
      setLoading(false);
    } else if (active === 0 && funcCall == 1) {
      action({
        data: data,
        time: Math.ceil(bluetooth.GetTime()),
        freq: Math.ceil(data[values[0]].length / sampleTime),
      }).then((filterdDataTemp) => {
        filterdDataTemp && setFilteredData(filterdDataTemp);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, funcCall]);

  useEffect(() => {
    return bluetooth.turnOff;
  }, []);

  const startInput = () => {
    setLoading(true);
    flushData && flushData();
    setFilterShow(0);
    setForceScale(0);
    setData(init);
    startTime.current = setTimeout(() => {
      setActive(1);
      setLoading(false);
      bluetooth.start();
    }, [pendingTime]);
    endTime.current = setTimeout(() => {
      setActive(active => 1-active);
      bluetooth.stop();
    }, [sampleTime * 1000 + pendingTime]);
  };

  const getStreamOfData = (key) => {
    if (diagrams.length === 2) {
      if (active === 1) {
        if (data[key].length > scale * (forceScale + 1))
          setForceScale(forceScale + 1);
        return data[key].slice(scale * forceScale, data[key].length);
      }
      if (active === 0) {
        return data[key];
      }
    }
    if (data[key]) {
      if (filterShow) {
        return filteredData[filterShow - 1];
      }
      if (active === 1) {
        const start = data[key].length > scale ? data[key].length - scale : 0;
        return data[key].slice(start, data[key].length);
      }
      if (active === 0) {
        return data[key];
      }
    }
    if (key === "temperature" && data[key].length > 0) return data[key];
    return [...new Array(scale).fill(0)];
  };
  return (
    <div className="measure-section">
      <br />
      <br />
      <Row className="align-items-center">
        <Col md={10} xs={12} sm={10}>
          {title(openModal, changeFilterShow, filterShow)}
        </Col>
        <Col md = {2} xs={12} sm={2}>
          <Form>
            <Form.Group className="mt-5" controlId="formBasicEmail">
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
              dotShow={filterShow}
              fs={
                active === 1
                  ? 1
                  : Math.ceil(data[values[0]].length / sampleTime)
              }
              xAxisDomain={
                values.includes("temperature")
                  ? sampleTime
                  : diagrams.length % 2 === 0
                  ? active === 1
                    ? 4000
                    : ""
                  : active === 1
                  ? scale
                  : ""
              }
              type="line"
            />
          </Col>
        ))}
      </Row>
      <MeasureModal
        loading={loading}
        show={show}
        closeModal={closeModal}
        autoStart={startInput}
      />
      {children()}
      {bluetooth.isConnected ? (
        <></>
      ) : (
        <BlutoothModal show={bluShow} closeModal={closeBluModal} />
      )}
    </div>
  );
}

export default MeasureBase;
