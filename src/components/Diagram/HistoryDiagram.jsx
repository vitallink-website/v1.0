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
  CartesianGrid,
} from "recharts";
import * as saveSvgAsPng from "save-svg-as-png";
import { jsPDF } from "jspdf";
import { Button } from "react-bootstrap";

const HistoryDiagram = ({ dataKey = "", flow = [], texts = "" }) => {
  console.log(flow);
  const steam = [...flow].map((item, id) => {
    return {
      name: item?.id ?? id,
      [dataKey]: item?.value ?? item,
      impression: 0,
    };
  });

  function prepareSvgFile() {
    const svg = document.querySelector(".recharts-surface");
    var svgNS = "http://www.w3.org/2000/svg";
    if (texts != "") {
      var newText = document.createElementNS(svgNS, "text");
      newText.setAttributeNS(null, "x", 60);
      newText.setAttributeNS(null, "y", 450);
      newText.setAttributeNS(null, "font-size", "28");
      newText.setAttributeNS(null, "font-family", "cursive");
      texts.map((text) => {
        var tspan = document.createElement("tspan");
        tspan.setAttribute("x", "60");
        tspan.setAttribute("dy", "2em");
        tspan.textContent = text;
        newText.appendChild(tspan);
      });
      svg.appendChild(newText);
    }
    return svg;
  }

  function downloadSVGAsPNG(e) {
    const svg = prepareSvgFile();
    const fileName = dataKey + ".png";
    saveSvgAsPng.saveSvgAsPng(svg, fileName, {
      scale: 2.0,
      backgroundColor: "white",
      width: "1500",
      height: "800",
      top: "-100",
      left: "25",
    });
  }

  function downloadPDFAsPNG(e) {
    const element = prepareSvgFile();
    const fileName = dataKey + ".pdf";

    saveSvgAsPng
      .svgAsPngUri(element, {
        scale: 2.0,
        backgroundColor: "white",
        width: "1500",
        height: "800",
        top: "-100",
        left: "25",
      })
      .then((dataUrl) => {
        const doc = new jsPDF();
        doc.addImage(dataUrl, "png", 0, 10, 200, 100).save(fileName);
      });
  }

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <ResponsiveContainer height={400} width={"100%"}>
        <LineChart data={steam}>
          <XAxis
            dataKey="date"
            name="Time"
            tick = "hi"
            // interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey={dataKey} stroke="#8884d8" animationDuration={500} />
          {steam.length > 500 && <Brush />}
        </LineChart>
      </ResponsiveContainer>
      <Button onClick={downloadSVGAsPNG}>download PNG</Button>
      <Button onClick={downloadPDFAsPNG}>download PDF</Button>
    </div>
  );
};

export default HistoryDiagram;
