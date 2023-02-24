import * as saveSvgAsPng from "save-svg-as-png";
import { jsPDF } from "jspdf";

export function prepareSvgFile(texts) {
  const svg = document.querySelector(".recharts-surface");
  const svgNS = "http://www.w3.org/2000/svg";
  if (texts !== "") {
    let newText = document.createElementNS(svgNS, "text");
    newText.setAttributeNS(null, "x", 60);
    newText.setAttributeNS(null, "y", 450);
    newText.setAttributeNS(null, "font-size", "28");
    newText.setAttributeNS(null, "font-family", "cursive");
    texts.map((text) => {
      let tspan = document.createElement("tspan");
      tspan.setAttribute("x", "60");
      tspan.setAttribute("dy", "2em");
      tspan.textContent = text;
      newText.appendChild(tspan);
      return "";
    });
    svg.appendChild(newText);
  }
  return svg;
}

export function downloadSVGAsPNG(e, dataKey, texts) {
  const svg = prepareSvgFile(texts);
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

export function downloadPDFAsPNG(e, dataKey, texts) {
  const element = prepareSvgFile(texts);
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
