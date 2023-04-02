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
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Diagram = ({
  dataKey = "",
  flow = [],
  texts = "",
  calculatedDots = [],
  dotShow = false,
  xAxisDomain = "",
  type,
}) => {
  const getSteam = () => {
    let steam = [...flow].map((item, id) => {
    if(type === "column")
      return {
        label: item?.id ?? id,
        y: item?.value ?? item,
      };      
    else  
      return {
        x: item?.id ?? id,
        y: item?.value ?? item,
      };
    });
    if (calculatedDots.length > 0 && dotShow) {
      steam = steam.map((item, e) => {
        for (const element of calculatedDots) {
          if (element['x'] === e) {item.markerColor = element['color'];
                                    item.markerSize = 10}
        }
        return item;
      });
    }
    return steam;
  };


  const options = {
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
      minimum: 0,
      maximum: xAxisDomain != "" ? xAxisDomain : null,
      labelFontFamily: "system-ui",
    },
    animationEnabled: true,
    animationDuration: 500,
    data: [
      {
        lineColor: "#8884d8",
        color:  "#8884d8",
        type: type,
        lineThickness: 1,
        dataPoints: getSteam(),
      },
    ],
  };


  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <div className="canva-chart">
        <CanvasJSChart options={options} />
      </div>
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
