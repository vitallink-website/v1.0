import * as saveSvgAsPng from "https://cdn.skypack.dev/save-svg-as-png@1.4.17";

export function shareData(data) {
    const date = new Date();
    const showTime1 =
      date.getFullYear() +
      "/" +
      date.getMonth() +
      "/" +
      date.getDate() +
      "-" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    const showTime2 =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      "-" +
      date.getHours() +
      "-" +
      date.getMinutes();

    const svg = document.querySelector(".recharts-surface");
    
    const fileName = showTime2 + "-CardiogramData.png";

    saveSvgAsPng.svgAsPngUri(svg, {scale: 2.0, backgroundColor : "white",width: "1500", height : "800", top: "-100", "left" : "25"}).then(async(dataUrl) => {
        const file = await (await fetch(dataUrl)).blob();

        const image = new File([file], fileName, { type: file.type });    
        if (navigator.canShare && navigator.canShare({ files: [image] })) {
          try {
            await navigator.share({
              files: [image], 
              text: "Heartbeat is 80",
              title: showTime1 + " CardiogramData", 
            });
          } catch (error) {
            console.log("Sharing failed!", error);
          }
        } else {
          console.log("This device does not support sharing files.");
        }
    });
  }