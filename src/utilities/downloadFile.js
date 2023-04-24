import { jsPDF } from "jspdf";

export function prepareURLFile(queryName, texts) {
  var oldCanvas = document.querySelector(queryName)
  var newCanvas = document.createElement('canvas');
  var context = newCanvas.getContext('2d');

  //set dimensions
  newCanvas.width = oldCanvas.width;
  newCanvas.height = oldCanvas.height + 200;
  context.fillStyle = "white";
  context.fillRect(0, 0, newCanvas.width, newCanvas.height);

  context.drawImage(oldCanvas, 0, 0);
  var yPosition = 50;
  texts.map((text) => {
    context.fillStyle = "black";
    context.font = "25px Comic Sans MS";
    context.fillText(text, 50, oldCanvas.height + yPosition);
    yPosition += 50;
  });
  var dataURL = newCanvas.toDataURL("image/jpeg", 1.0);
  return dataURL;
}

function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

export function downloadSVGAsPNG(e, dataKey, texts) {
  var dataURL = prepareURLFile('#chartContainer canvas', texts); 
  const fileName = dataKey + ".png";
  downloadImage(dataURL, fileName);
}

export function downloadPDFAsPNG(e, dataKey, texts) {
  var dataURL = prepareURLFile('#chartContainer canvas', texts); 
  const fileName = dataKey + ".pdf";
  const doc = new jsPDF();
  doc.addImage(dataURL, "png", 0, 10, 200, 100).save(fileName);
}
