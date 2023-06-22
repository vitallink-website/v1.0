import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useAddToDB } from "../../../../utilities/AddToDB";
import { UserContext } from "../../../../App";
import { FcCheckmark } from "react-icons/fc";
import Swal from "sweetalert2";
import axios from "axios";

function BPWithoutCalibration() {
  const UserInfo = useContext(UserContext);
  const [SYS, setSYS] = useState(0);
  const [DIA, setDIA] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(0);
  const dbFunc = useAddToDB("BPData");
  const [saved, setSaved] = useState(0);
  
  async function calculate (inputs) {
    console.log(inputs.data);
    let payload = {
      IR: "[" + inputs.data.ir.toString() + "]",
      force: "[" + inputs.data.force.toString() + "]",
      fs: inputs.freq,
    };
    let res = await axios.post("https://194.147.142.88//bp_signal", payload);
    console.log(res.data);
    if(!Number(res.data.Try_Again)){
      setSYS(res.data.Diastolic);
      setDIA(res.data.Systolic);  
      setQualityIndex(res.data.Quality_index);
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please repeat procedure!",
      });
    }
    
  };

  function addToDB(){
    var dataParameter = {};
    dataParameter["SYS"] = SYS;
    dataParameter["DIA"] = DIA;
    dbFunc.updateHistory(dataParameter);
    setSaved(1);
  }

  const flushDatas = () => {setSaved(0);
                            setDIA('');
                            setSYS('');
                            setQualityIndex('');
                          }

  return (
    <MeasureBase
      {...{
        values: ["ir", "force"],
        diagrams: [
          {
            name: "ir",
            calculatedDots: []
          },
          {
            name: "force",
            calculatedDots: [],
          },
        ],
        command: 0x01,
        action: calculate,
        flushData: flushDatas,
        texts: ["SYS/DIA: " + SYS + "/" + DIA, "Quality index: " + qualityIndex],
        title: (openModal) => (
          <>
            <h2 className="measure-title">
              Blood Pressure Estimation without Calibration
            </h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your finger on PPG and Force sensors and try to
                  follow the force line by pressing the sensors
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
              <Link to="/Measure/Measurement">
                <Button> Back</Button>
              </Link>
            </Col>
            <Col>
              <h5 style={{ color: "black" }}>
                SYS/DIA: {SYS}/{DIA}  (mmHg)
              </h5>
            </Col>
            <Col>
              <h5 style={{ color: "black" }}>
                Quality Index: {Number(0.0).toFixed(2)} (%)
              </h5>
            </Col>
            <Col>
              <Button onClick={() => {}}>Output</Button>
            </Col>
            <Col>
                <Button onClick={() => addToDB()} >Save {saved ? <FcCheckmark /> : "" }</Button>
            </Col>
          </Row>
        </>
        ),
      }}
    />
  );
}

export default BPWithoutCalibration;
