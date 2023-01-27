import * as saveSvgAsPng from "save-svg-as-png";
import {
  GetCurrentDateTime,
  GetCurrentDateTimeForFileName,
} from "../../../utilities/time";

export function shareData(dataName, texts) {
  const showTime1 = GetCurrentDateTime();
  const showTime2 = GetCurrentDateTimeForFileName();

  const svg = document.querySelector(".recharts-surface");
  let svgNS = "http://www.w3.org/2000/svg";
  let newText = document.createElementNS(svgNS, "text");
  newText.setAttributeNS(null, "x", 60);
  newText.setAttributeNS(null, "y", 450);
  newText.setAttributeNS(null, "font-size", "28");
  newText.setAttributeNS(null, "font-family", "cursive");
  texts.foreach((text) => {
    let tspan = document.createElement("tspan");
    tspan.setAttribute("x", "60");
    tspan.setAttribute("dy", "2em");
    tspan.textContent = text;
    newText.appendChild(tspan);
  });
  svg.appendChild(newText);

  const fileName = showTime2 + "-" + dataName + ".png";

  saveSvgAsPng
    .svgAsPngUri(svg, {
      scale: 2.0,
      backgroundColor: "white",
      width: "1500",
      height: "800",
      top: "-100",
      left: "25",
    })
    .then(async (dataUrl) => {
      const file = await (await fetch(dataUrl)).blob();

      const image = new File([file], fileName, { type: file.type });
      if (navigator.canShare && navigator.canShare({ files: [image] })) {
        try {
          await navigator.share({
            files: [image],
            title: showTime1 + " " + dataName,
          });
        } catch (error) {
          console.log("Sharing failed!", error);
        }
      } else {
        console.log("This device does not support sharing files.");
      }
    });
}
