import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../App";
import { useIndexedDB } from "react-indexed-db";
import { shareData } from "../../share/Share";
import { GetCurrentDateTimeDB } from "../../../../utilities/time";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import AddToDB from "../../../../utilities/AddToDB";

function Cardiogram() {
  const UserInfo = useContext(UserContext);

  const { update: updateParameterHistory } = useIndexedDB("cardiogramData");
  const { getByID, update: updateTimeHistory } = useIndexedDB("dataTime");

  const [heartBeat, setHeartBeat] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const [PR_RR_Interval, setPR_RR_Interval] = useState(0);
  const [QRS_Duration, setQRSDuration] = useState(0);
  const [p, setP] = useState(0);
  const [q, setQ] = useState(0);
  const [r, setR] = useState(0);
  const [s, setS] = useState(0);
  const [t, setT] = useState(0);

  useEffect(() => {
    const currentDate = GetCurrentDateTimeDB();
    const id = currentDate + UserInfo.id;
    console.log(id);
    getByID(id).then(
      (data) => {
        console.log(data);
        const [dateAndId, ...newData] = data;
        UserInfo.setParameters(newData);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);
  

  const addToDB = (heartBeat, PR_RR_Interval, QRS_Duration) => {
    const currentDate = GetCurrentDateTimeDB();
    const id = parseInt(String(currentDate + UserInfo.id));

    updateParameterHistory({
      dateAndId: id,
      userId: UserInfo.id,
      heartBeatECG: heartBeat,
      PR_RR_Interval: PR_RR_Interval,
      QRS_Duration: QRS_Duration,
    }).then(
      (event) => {
        console.log("cardiogramData updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );

    var newParameter = UserInfo.parameters;
    newParameter["heartBeatECG"] = heartBeat;
    newParameter["QRS_Duration"] = QRS_Duration;
    newParameter["PR_RR_Interval"] = PR_RR_Interval;

    updateTimeHistory({
      dateAndId: id,
      userId: UserInfo.id,
      parameters: newParameter,
    }).then(
      (event) => {
        console.log("timeData updated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const calculateBeatPerMinute = (inputs) => {
    console.log(inputs.data);
    console.log(inputs.freq);
    const signal_output = Array.from(
      // eslint-disable-next-line no-undef
      ECG_signal_processing(inputs.data.ecg, inputs.freq)
    ); // HeartRate, PR_RR, QRS_duration, Quality_index, P, Q, R, S, T
    
    console.log(signal_output);
    if (inputs.freq !== 0 && signal_output.length != 0) {
      console.log(signal_output[0]);
      console.log(signal_output[1]);
      console.log(signal_output[2]);
      console.log(signal_output[3]);
      console.log(Array.from(signal_output[4]));
      console.log(Array.from(signal_output[5]));
      console.log(Array.from(signal_output[6]));
      console.log(Array.from(signal_output[7]));
      console.log(Array.from(signal_output[8]));
      const heartBeat = Number(
        signal_output[Object.keys(signal_output)[0]]
      ).toFixed(0);
      const PR_RR_Interval = Number(
        signal_output[Object.keys(signal_output)[1]]
      ).toFixed(2);
      const QRS_Duration = Number(
        signal_output[Object.keys(signal_output)[2]]
      ).toFixed(2);
      setHeartBeat(heartBeat);
      setPR_RR_Interval(PR_RR_Interval);
      setQRSDuration(QRS_Duration);
      setQualityIndex(
        Number(signal_output[Object.keys(signal_output)[3]]).toFixed(0)
      );
      let newPArr = [];
      let newQArr = [];
      let newRArr = [];
      let newSArr = [];
      let newTArr = [];
      for (const p of Array.from(signal_output[4]))
        newPArr.push({ x: p, y: inputs.data[p] });
      for (const q of Array.from(signal_output[5]))
        newQArr.push({ x: q, y: inputs.data[q] });
      for (const r of Array.from(signal_output[6]))
        newRArr.push({ x: r, y: inputs.data[r] });
      for (const s of Array.from(signal_output[7]))
        newSArr.push({ x: s, y: inputs.data[s] });
      for (const t of Array.from(signal_output[7]))
        newTArr.push({ x: t, y: inputs.data[t] });
      console.log("newParr: " + JSON.stringify(newPArr));
      setP(newPArr);
      setQ(newQArr);
      setR(newRArr);
      setS(newSArr);
      setT(newTArr);
    // var newParameter = UserInfo.parameters;
    // var dataParameter = {};
    // newParameter["heartBeatECG"] = heartBeat;
    // newParameter["QRS_Duration"] = QRS_Duration;
    // newParameter["PR_RR_Interval"] = PR_RR_Interval;
    // dataParameter["heartBeatECG"] = heartBeat;
    // dataParameter["QRS_Duration"] = QRS_Duration;
    // dataParameter["PR_RR_Interval"] = PR_RR_Interval;
    //   AddToDB("cardiogramData", dataParameter, newParameter);
    }
    else
      console.log("array is empty or freq is 0");
  };

  return (
    <MeasureBase
      {...{
        values: ["ecg"],
        diagrams: [
          {
            name: "ecg",
            calculatedDots: [],
          },
        ],
        command: 0x02,
        action: calculateBeatPerMinute,
        texts: ["Heart beat: " + heartBeat],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Cardiogram</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your right and left fingers on ECG sensors and then
                  press
                </h5>
              </Col>
              <Col sm={2}>
                <Button onClick={openModal}>Start</Button>
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
                {/* <Link to="/Measure/Measurement/Cardiogram/AbnormalityDetection"> */}
                <Button disabled>Abnormality Detection</Button>
                {/* </Link> */}
              </Col>
              <Col>
                <Button
                  onClick={() =>
                    shareData("CardiogramData", ["Heart beat: " + heartBeat])
                  }
                >
                  output
                </Button>
              </Col>
              <Col>
                <Link to="/">
                  <Button>Save</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={() =>
                    calculateBeatPerMinute({ data: ppg_data, freq: 120 })
                  }
                >
                  Calculate
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
