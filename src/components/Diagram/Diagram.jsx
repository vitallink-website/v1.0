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
import * as saveSvgAsPng from "save-svg-as-png";
import { jsPDF } from "jspdf";
import { Button } from "react-bootstrap";

const Diagram = ({ dataKey = "", flow = [] }) => {
  const steam = [...flow].map((item, id) => {
    return {
      name: item?.id ?? id,
      [dataKey]: item?.value ?? item,
      impression: 0,
    };
  });

  function downloadSVGAsPNG(e) {
    const svg = document.querySelector(".recharts-surface");
    const filename = "myfilename.png";
    saveSvgAsPng.saveSvgAsPng(svg, filename);
  }
  function downloadPDFAsPNG(e) {
    const element = document.querySelector(".recharts-surface");
    const filename = "myfilename.pdf";

    saveSvgAsPng.svgAsPngUri(element).then((dataUrl) => {
      const doc = new jsPDF();
      doc.addImage(dataUrl, "png", 0, 10, 200, 90).save(filename);
    });
  }

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <ResponsiveContainer height={400} width={"100%"}>
        <LineChart data={steam}>
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

          {steam.length > 200 && <Brush />}
        </LineChart>
      </ResponsiveContainer>
      <Button onClick={downloadSVGAsPNG}>download PNG</Button>
      <Button onClick={downloadPDFAsPNG}>download PDF</Button>
    </div>
  );
};

export default Diagram;
