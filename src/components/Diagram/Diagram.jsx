import * as React from "react";
import {
  Brush,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "react-bootstrap";
import {
  downloadPDFAsPNG,
  downloadSVGAsPNG,
} from "../../utilities/downloadFile";

const Diagram = ({ dataKey = "", flow = [], texts = "" }) => {
  console.log("🚀 ~ file: Diagram.jsx:18 ~ Diagram ~ flow", flow)
  const steam = [...flow].map((item, id) => {
    return {
      name: item?.id ?? id,
      [dataKey]: item?.value ?? item,
      impression: 0,
    };
  });

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <ResponsiveContainer height={400} width={"100%"}>
        <LineChart
          data={
            steam.length > 2500
              ? steam.slice(
                  Math.ceil(steam.length / 2) - 500,
                  Math.ceil(steam.length / 2) + 500
                )
              : steam
          }
        >
          <XAxis dataKey="name" domain={["dataMin", "dataMax"]} type="number" />
          <YAxis
            domain={["dataMax-10", "dataMax+10"]}
            type="number"
            yAxisId="1"
          />
          <Legend />
          <Line
            yAxisId="1"
            type="linear"
            dataKey={dataKey}
            stroke="#8884d8"
            dot={false}
            animationDuration={500}
          />

          {steam.length > 500 && <Brush />}
        </LineChart>
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
