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
    saveSvgAsPng.saveSvgAsPng(svg, fileName);
    console.log(svg);

    saveSvgAsPng.svgAsPngUri(svg).then(async(dataUrl) => {
        var file = new Blob([dataUrl],  { type: "image/png" });
        console.log(file);
        const image = new File([file], fileName, { type: file.type });
        console.log(image);
    
        // Check if the device is able to share these files then open share dialog
        if (navigator.canShare && navigator.canShare({ files: [image] })) {
          try {
            await navigator.share({
              files: [image], // Array of files to share
              title: showTime1 + " CardiogramData", // Share dialog title
            });
          } catch (error) {
            console.log("Sharing failed!", error);
          }
        } else {
          console.log("This device does not support sharing files.");
        }
    });
    // console.log(file);

    // const json = JSON.stringify(data);
    // const file = new Blob([svg],  { type: "image/png" });
    // const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    //const file = new Blob([blob], { type: "text/plain" });
  }
