import * as React from "react";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
  Brush,
  ResponsiveContainer,
} from "recharts";
import { Button } from "react-bootstrap";
import {
  downloadPDFAsPNG,
  downloadSVGAsPNG,
} from "../../utilities/downloadFile";
import CanvasJSReact from './canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Diagram = ({
  dataKey = "",
  flow = [],
  texts = "",
  calculatedDots = [],
  // { name: "q", value: { x: 1242, y: 100 },color:"" }
}) => {
  const getSteam = () => {
    let steam = [...flow].map((item, id) => {
      return {
        x: item?.id ?? id,
        [dataKey]: item?.value ?? item,
        impression: 0,
      };
    });
    if (calculatedDots.length > 0) {
      steam = steam.map((item, e) => {
        for (const element of calculatedDots) {
          if (element.value.x === e) item[element.name] = element.value.y;
        }
        return item;
      });
    }
    return steam;
  };

  const dataOfChart = getSteam();

  const options = {
    theme: "light1", // "light1", "dark1", "dark2"
    backgroundColor: "transparent",
    axisY:{
      labelFontFamily: "system-ui",
      gridThickness: 0,
    },
    axisX:{
      labelFontFamily: "system-ui"
    },
    data: [{				
          type: "line",
          lineColor: "#8884d8",
          lineThickness: 1,
          dataPoints: [...flow].map((item, id) => {
          return {
            x: item?.id ?? id,
            y: item?.value ?? item,
          };
        })
     }]
 }

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      {dataKey !== "pcg" ? (
        <ResponsiveContainer height={400} width={"100%"}>
          <ComposedChart
            data={
              // dataOfChart.length > 2500
              //   ? dataOfChart.slice(
              //       Math.ceil(dataOfChart.length / 2) - 500,
              //       Math.ceil(dataOfChart.length / 2) + 500
              //     )
              //   :
              dataOfChart
            }
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis dataKey="x" domain={[0, "auto"]} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey={dataKey}
              stroke="#8884d8"
              dot={false}
              animationDuration={500}
            />
            {calculatedDots.length !== 0 ? (
              <>
                <Scatter dataKey="p" fill="red" />
                <Scatter dataKey="q" fill="blue" />
                <Scatter dataKey="r" fill="black" />
                <Scatter dataKey="s" fill="white" />
                <Scatter dataKey="t" fill="orange" />
              </>
            ) : (
              <></>
            )}
            {dataOfChart.length > 200 && <Brush />}
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <CanvasJSChart options = {options}/>
      )}
      <Button onClick={(e) => downloadSVGAsPNG(e, dataKey, texts)}>
        download PNG
      </Button>
      <Button onClick={(e) => downloadPDFAsPNG(e, dataKey, texts)}>
        download PDF
      </Button>
    </div>
  );
};

export default Diagram;
