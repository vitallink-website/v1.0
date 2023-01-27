import * as React from "react";
import {
  Brush,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Button } from "react-bootstrap";
import {
  downloadPDFAsPNG,
  downloadSVGAsPNG,
} from "../../utilities/downloadFile";

const HistoryDiagram = ({ dataKey = "", flow = [], texts = "" }) => {
  console.log(dataKey, flow);
  const steam = [...flow].map((item, id) => {
    console.log(item, id);
    return {
      name: item?.id ?? id,
      date: item?.date ?? item,
      [dataKey]: item?.value ?? item,
      impression: 0,
    };
  });

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <ResponsiveContainer height={400} width={"100%"}>
        <LineChart data={steam}>
          <XAxis dataKey="date" name="Time" tick="hi" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey={dataKey} stroke="#8884d8" animationDuration={500} />
          <Brush />
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

export default HistoryDiagram;
