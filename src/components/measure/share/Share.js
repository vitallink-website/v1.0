import * as saveSvgAsPng from "save-svg-as-png";
import {
  GetCurrentDateTime,
  GetCurrentDateTimeForFileName,
} from "../../../utilities/time";
import { prepareURLFile } from "../../../utilities/downloadFile";

export function shareCardiogramData(dataName, texts) {

}

export async function shareData(dataName, texts) {
  const showTime1 = GetCurrentDateTime();
  const showTime2 = GetCurrentDateTimeForFileName();

  var dataURL = prepareURLFile(texts);
  const fileName = showTime2 + "-" + dataName + ".png";
  const file = await (await fetch(dataURL)).blob();
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
  } else
    console.log("This device does not support sharing files.");
}
