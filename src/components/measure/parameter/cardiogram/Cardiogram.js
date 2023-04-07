import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useAddToDB } from "../../../../utilities/AddToDB";
import { FcCheckmark } from "react-icons/fc";
import { set } from "rsuite/esm/utils/dateUtils";
import AbnormalityDetection from "./AbnormalityDetection";

function Cardiogram() {
  const dbFunc = useAddToDB("cardiogramData");

  const [heartBeat, setHeartBeat] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [PR_RR_Interval, setPR_RR_Interval] = useState(0);
  const [QRS_Duration, setQRSDuration] = useState(0);
  const [dot, setDot] = useState([]);
  const [saved, setSaved] = useState(0);
  const [hrv, setHrv] = useState([]);
  const [hrvVal, setHrvVal] = useState(0);
  const [ssTime, setSsTime] = useState([]);
  const [singleSpike, setSingleSpike] = useState([]);
  const [PQRST_ss, setPQRST_ss] = useState([]);

  function makePQRST(ps, qs, rs, ss, ts) {
    let newArr = [];
    for (const p of ps) newArr.push({ x: Number(p), color: "red" });
    for (const q of qs) newArr.push({ x: Number(q), color: "blue" });
    for (const r of rs) newArr.push({ x: Number(r), color: "black" });
    for (const s of ss) newArr.push({ x: Number(s), color: "white" });
    for (const t of ts) newArr.push({ x: Number(t), color: "orange" });
    console.log("newParr: " + JSON.stringify(newArr));
    return newArr;
  }

  async function calculateBeatPerMinute(inputs) {
    console.log(inputs.data);
    console.log(inputs.freq);
    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      await ECG_signal_processing(inputs.data.ecg, inputs.freq)
    ); // HeartRate, PR_RR, QRS_duration, Quality_index, P, Q, R, S, T

    if (inputs.freq !== 0 && signal_output.length !== 0) {
      console.log(signal_output[0]);
      console.log(signal_output[1]);
      console.log(signal_output[2]);
      console.log(signal_output[3]);
      // console.log(Array.from(signal_output[4]));
      // console.log(Array.from(signal_output[5]));
      // console.log(Array.from(signal_output[6]));
      // console.log(Array.from(signal_output[7]));
      // console.log(Array.from(signal_output[8]));
      // console.log(Array.from(signal_output[9]));
      const heartBeat = parseInt(signal_output[Object.keys(signal_output)[0]]);
      const PR_RR_Interval = parseFloat(
        signal_output[Object.keys(signal_output)[1]]
      );
      const QRS_Duration = parseFloat(
        signal_output[Object.keys(signal_output)[2]]
      );
      setHeartBeat(heartBeat);
      setPR_RR_Interval(PR_RR_Interval);
      setQRSDuration(QRS_Duration);
      setQualityIndex(
        parseInt(signal_output[Object.keys(signal_output)[3]]).toFixed(0)
      );
      // console.log(Array.from(signal_output[10]));
      // console.log(Array.from(signal_output[11]));
      // console.log(Array.from(signal_output[12]));

      setSsTime(Array.from(signal_output[10]));
      setSingleSpike(Array.from(signal_output[11]));
      let ssPQRST = Array.from(signal_output[12]);
      console.log("ss pqrst" + ssPQRST);
      setPQRST_ss(ssPQRST);
      setHrv(Array.from(signal_output[13]));
      setHrvVal(parseInt(signal_output[Object.keys(signal_output)[14]]));
      // console.log(Array.from(signal_output[13]));
      let newArr = makePQRST(
        Array.from(signal_output[4]),
        Array.from(signal_output[5]),
        Array.from(signal_output[6]),
        Array.from(signal_output[7]),
        Array.from(signal_output[8])
        );
      setDot(newArr);
      let filterd_signal = Array.from(signal_output[9]);
      return [filterd_signal];
    } else console.log("array is empty or freq is 0");
  }

  function addToDB() {
    var dataParameter = {};
    dataParameter["heartBeatECG"] = heartBeat;
    dataParameter["QRS_Duration"] = QRS_Duration;
    dataParameter["PR_RR_Interval"] = PR_RR_Interval;
    dbFunc.updateHistory(dataParameter);
    setSaved(1);
  }

  const flushDatas = () => {
    setDot([]);
    setSaved(0);
    setHeartBeat("");
    setPR_RR_Interval("");
    setQRSDuration("");
    setHrv([]);
    setHrvVal("");
    setPQRST_ss([]);
    setSsTime([]);
    setSingleSpike([]);
  };

  return (
    <MeasureBase
      {...{
        values: ["ecg"],
        diagrams: [
          {
            name: "ecg",
            calculatedDots: dot,
          },
        ],
        command: 0x02,
        action: calculateBeatPerMinute,
        flushData: flushDatas,
        texts: [
          "Heart beat: " + heartBeat,
          "QRS_Duration: " + QRS_Duration,
          "PR_RR_Interval: " + PR_RR_Interval,
        ],
        title: (openModal, changeFilterShow, filterShow) => (
          <>
            <h2 className="measure-title">Cardiogram</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={7}>
                <h5 className="measure-title">
                  Please put your right and left fingers on ECG sensors and then
                  press
                </h5>
              </Col>
              <Col sm={2}>
                <Button onClick={openModal}>Start</Button>
              </Col>
              <Col sm={3}>
                <Button onClick={() => changeFilterShow(filterShow ? 0 : 1)}>
                  {filterShow ? "main" : "Filtered"} signal
                </Button>
              </Col>
            </Row>
          </>
        ),
        children: () => (
          <>
            <Row className="measure-button-row">
              <Col>
                <h5 style={{ color: "black" }}>Heartbeat: {heartBeat} (bpm)</h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  PR/RR Interval: {PR_RR_Interval}
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  QRS Duration: {QRS_Duration} (ms)
                </h5>
              </Col>
              <Col>
                <h5 style={{ color: "black" }}>
                  Quality Index: {qualityIndex} (%)
                </h5>
              </Col>
            </Row>
            <Row className="measure-button-row">
              <Col>
                <Link to="/Measure/Measurement">
                  <Button> Back</Button>
                </Link>
              </Col>
              <Col>
                <Button
                  onClick={() =>
                    shareData("CardiogramData", [
                      "Heart beat: " + heartBeat,
                      "PR/RR Interval: " + PR_RR_Interval,
                      "QRS Duration: " + QRS_Duration,
                    ])
                  }
                >
                  output
                </Button>
              </Col>
              <Col>
                <Button onClick={() => addToDB()}>
                  Save {saved ? <FcCheckmark /> : ""}
                </Button>
              </Col>
            </Row>
            <Row>
              <AbnormalityDetection
                hrv={hrv}
                hrvVal={hrvVal}
                ssTime={ssTime}
                singleSpike={singleSpike}
                PQRST_ss={PQRST_ss}
              ></AbnormalityDetection>
            </Row>
          </>
        ),
      }}
    />
  );
}

export default Cardiogram;
