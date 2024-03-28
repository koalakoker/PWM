// Canvas Init
let canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

// Animation Set and run
let fps = 60;
let dt = 1 / fps;
setInterval(draw, 1000 / fps);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  //ctx.translate(canvas.height / 2, canvas.height / 2);
  // Put here the content

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.beginPath();
  let amp = 50;
  let xStart = 100;
  let xEnd = canvas.width - 100;
  let y0 = canvas.height / 2;
  let y = y0;
  let th = 0;
  let wave = 10;
  let dTh = (wave * (2 * Math.PI)) / (xEnd - xStart);
  ctx.moveTo(xStart - 50, y);
  ctx.lineTo(xStart, y);
  for (let x = xStart; x < xEnd; x += 1) {
    y = y0 + amp * Math.sin(th);
    th += dTh;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(xEnd + 50, y);

  ctx.stroke();
  ctx.restore();
}
