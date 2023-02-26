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
  const data = getSteam();
  // console.log("🚀 ~ file: Diagram.jsx:46 ~ data:", data, calculatedDots);
  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <ResponsiveContainer height={400} width={"100%"}>
        <ComposedChart
          data={
            data.length > 2500
              ? data.slice(
                  Math.ceil(data.length / 2) - 500,
                  Math.ceil(data.length / 2) + 500
                )
              : data
          }
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <XAxis dataKey="x" scale="band" />
          <YAxis domain={["dataMax-10", "dataMax+10"]} />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
            animationDuration={500}
          />
          {/* {calculatedDots.map((item, i) => (
            <Scatter key={i} dataKey={item.name} fill={item.color} />
          ))} */}
        {data.length > 200 && <Brush />}

        </ComposedChart>
      </ResponsiveContainer>
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
