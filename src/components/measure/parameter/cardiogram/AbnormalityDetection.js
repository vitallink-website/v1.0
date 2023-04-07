import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CanvasJSReact from "../../../Diagram/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function AbnormalityDetection({ hrv, hrvVal, ssTime, singleSpike, PQRST_ss }) {

  const getHrvSteam = () => {
    let steam = [...hrv].map((item, id) => {
      return {
        x: item?.id ?? id,
        y: item?.value ?? item,
      };
    })
    return steam;
  }

  const getSingleSpikeSteam = () => {
    let steam = [...singleSpike].map((item, id) => {
          return {
            x: item?.id ?? id,
            y: item?.value ?? item,
          };
        })
    if (PQRST_ss.length > 0) {
      console.log("pqrst " + PQRST_ss );
      console.log("size " + steam.length);
      let i = 0;
      let color = ["red", "blue", "black", "white", "orange"];
      steam = steam.map((item, e) => {
        console.log("hry " + PQRST_ss[i] , e);
        if (Number(PQRST_ss[i]) === Number(e)) {
          console.log(color[i]);
          item.markerColor = color[i];
          i++;
          item.markerSize = 10;
        }
        else{
          item.markerSize = 1;
        }
        return item;
      })}
      return steam;
  }

  function getOptions(data) {
    return {
      theme: "light1",
      backgroundColor: "transparent",
      zoomEnabled: true,
      toolTip: {
        animationEnabled: true,
      },
      axisY: {
        labelFontFamily: "system-ui",
        gridThickness: 0,
      },
      axisX: {
        labelFontFamily: "system-ui",
      },
      animationEnabled: true,
      animationDuration: 500,
      data: [
        {
          type: "line",
          lineColor: "#8884d8",
          color: "#8884d8",
          lineThickness: 1,
          fill: { value: 20 },
          dataPoints: data === 'hrv' ? getHrvSteam() : getSingleSpikeSteam(),
        },
      ],
    };
  }

  return (
    <Row>
      <Col>
        <CanvasJSChart options={getOptions("hrv")} />
      </Col>
      <Col>
        <CanvasJSChart options={getOptions("singleSpike")} />
      </Col>
    </Row>
  );
}

export default AbnormalityDetection;
