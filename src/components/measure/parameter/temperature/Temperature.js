import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { shareData } from "../../share/Share";
import MeasureBase from "../../../MeasureBase/MeasureBase";
import { useAddToDB } from "../../../../utilities/AddToDB";
import { FcCheckmark } from "react-icons/fc";

function Temperature() {
  const [temperature, setTemperature] = useState(0);
  const [qualityIndex, setQualityIndex] = useState(100);
  const dbFunc = useAddToDB("TemperatureData");
  const [saved, setSaved] = useState(0);

  async function calculateTemperature(inputs){
    console.log(inputs.data.temperature);
    const average = inputs.data.temperature.reduce((a, b) => a + b, 0) / inputs.data.temperature.length;
    setTemperature(Number(average).toFixed(2));
  }

  function addToDB (){
    var dataParameter = {};
    dataParameter["temperature"] = temperature;
    dbFunc.updateHistory(dataParameter);
    setSaved(1);
  }

  const flushDatas = () => {setSaved(0);
                            setQualityIndex('');
                            setTemperature('');}

  return (
    <MeasureBase
      {...{
        values: ["temperature"],
        diagrams: [
          {
            name: "temperature",
          },
        ],
        command: 0x04,
        action: calculateTemperature,
        flushData: flushDatas,
        texts: ["Temperature: " + temperature, "Quality index: " + qualityIndex],
        title: (openModal) => (
          <>
            <h2 className="measure-title">Temperature</h2>
            <Row style={{ display: "flex", alignItems: "center" }}>
              <Col sm={8}>
                <h5 className="measure-title">
                  Please put your finger on temperature sensors and then press
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
            <Row className="mt-5">
              <Col>
                <h5 style={{ color: "black" }}>
                  Temperature: {temperature}
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
                  onClick={() => {
                    shareData("TemperatureData", [
                      "Temperature: " + temperature,
                      "Quality index: " + qualityIndex,
                    ]);
                  }}
                >
                  Output
                </Button>
              </Col>
              <Col>
                  <Button onClick={() => addToDB()}>Save {saved ? <FcCheckmark /> : "" }</Button>
              </Col>
            </Row>
          </>
        ),
      }}
    />
  );
}

export default Temperature;
