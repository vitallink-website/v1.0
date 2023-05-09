import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useAddToDB } from "../../../../utilities/AddToDB";
import { FcCheckmark } from "react-icons/fc";
import AbnormalityDetection from "./AbnormalityDetection";
import Swal from "sweetalert2";
import axios from "axios";

function Cardiogram() {
  const dbFunc = useAddToDB("cardiogramData");

  const [heartBeat, setHeartBeat] = useState("");
  const [qualityIndex, setQualityIndex] = useState("");
  const [PR_RR_Interval, setPR_RR_Interval] = useState("");
  const [QRS_Duration, setQRSDuration] = useState("");
  const [dot, setDot] = useState([]);
  const [saved, setSaved] = useState(0);
  const [hrv, setHrv] = useState([]);
  const [hrvVal, setHrvVal] = useState(0);
  const [ssTime, setSsTime] = useState([]);
  const [singleSpike, setSingleSpike] = useState([]);
  const [PQRST_ss, setPQRST_ss] = useState([]);
  const [ArrythmiaType, setArrythmiaType] = useState("");

  const types = [
    "Normal",
    "Sinus Tachicardia",
    "Sinus Bradicardia",
    "Premature Atrial Contrature (PAC)",
    "Paroxysmal Atrial Tachycardia (PAT)",
    "Multifocul Atrial Tachycardia (MAT)",
  ];

  function makePQRST(ps, qs, rs, ss, ts) {
    let newArr = [];
    for (const p of ps) newArr.push({ x: Number(p), color: "red" });
    for (const q of qs) newArr.push({ x: Number(q), color: "blue" });
    for (const r of rs) newArr.push({ x: Number(r), color: "black" });
    for (const s of ss) newArr.push({ x: Number(s), color: "white" });
    for (const t of ts) newArr.push({ x: Number(t), color: "orange" });
    // console.log("newParr: " + JSON.stringify(newArr));
    return newArr;
  }

  function makeArrayFormString(arr) {
    return arr.slice(1, -1)
      .split(",")
      .map(function (item) {
        return Number(item);
      });
  }

  async function calculateBeatPerMinuteAPI(inputs){
    console.log(inputs.data);
    let payload = {
      ECG: "[" + inputs.data.ecg.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("http://127.0.0.1:5000//ECG_signal", payload);
    console.log(res.data);
    if(!Number(res.data.Try_Again)){
      setHeartBeat(Number(res.data.HeartRate));
      setPR_RR_Interval(res.data.PR_RR);
      setQRSDuration(res.data.QRS_duration);
      setQualityIndex(res.data.Quality_index);
      let newArr = makePQRST(
        makeArrayFormString(res.data.P),
        makeArrayFormString(res.data.Q),
        makeArrayFormString(res.data.R),
        makeArrayFormString(res.data.S),
        makeArrayFormString(res.data.T)
      );
      setDot(newArr);

      setSsTime(makeArrayFormString(res.data.ss_time));
      setSingleSpike(makeArrayFormString(res.data.single_spike));
      setPQRST_ss(makeArrayFormString(res.data.PQRST_ss));
      setHrv(makeArrayFormString(res.data.hrv));
      setHrvVal(res.data.hrv_val);
      setArrythmiaType(parseInt(res.data.arrhythmia_type_PQRST));
      let filterd_signal = makeArrayFormString(res.data.ECG_filtered);
      return [filterd_signal];
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
      });
    }
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
        action: calculateBeatPerMinuteAPI,
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
                <Button
                  onClick={() => changeFilterShow(filterShow ? 0 : 1)}
                  disabled={heartBeat == ""}
                >
                  {filterShow ? "main" : "Filterd"} signal
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
            <div>
              <br />
              <br />
              <br />
            </div>
            <Row>
              <AbnormalityDetection
                heartBeat={heartBeat}
                hrv={hrv}
                hrvVal={hrvVal}
                ssTime={ssTime}
                singleSpike={singleSpike}
                PQRST_ss={PQRST_ss}
              ></AbnormalityDetection>
            </Row>
            <Row>
              <div>
                <br />
              </div>
              <h5 style={{ color: "black" }}>
                Arrythmia Type: {types[ArrythmiaType]}
              </h5>
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
                    ], 
                    ['#chartContainerAbnormality1 canvas', '#chartContainerAbnormality2 canvas'],
                    [ ["hrv: " + hrvVal],
                      ["Arrythmia Type: " + types[ArrythmiaType]]]
                    )
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
          </>
        ),
      }}
    />
  );
}

export default Cardiogram;
