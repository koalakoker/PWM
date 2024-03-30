// Canvas Init
let canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

// Animation Set and run
let fps = 60;
let dt = 1 / fps;
setInterval(draw, 1000 / fps);
let isOn = false;

// Inductor
let len = 200;
let amp = 25;
let angle = 0;
let wave = 10;

let fluxColor = ["red", "green", "blue"];
let fluxes = [];
let circuit = new Circuit();
for (let i = 0; i < 3; i++) {
  let inductor = new Inductor(amp, 0, len, 0, wave, 3, angle, fluxColor[i]);
  fluxes.push(inductor.flux);
  circuit.add(inductor);
  angle += (2 * Math.PI) / 3;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circuit.draw(ctx);
  if (isOn) {
    ctx.save();
    ctx.translate(300, 300);
    computeResultantFlux().draw(ctx);
    ctx.restore();
  }
}

function keypressed(e) {
  if (e.code === "Space") {
    circuit.toggle();
    isOn = !isOn;
  }
  if (e.code === "ArrowRight") {
    draw();
  }
}

function computeResultantFlux() {
  let dir = 0;
  let xTot = 0;
  let yTot = 0;
  for (let i = 0; i < fluxes.length; i++) {
    const flux = fluxes[i];
    let mag = flux.getMag();
    let x = mag * Math.cos(dir);
    let y = mag * Math.sin(dir);
    xTot += x;
    yTot += y;
    dir -= (2 * Math.PI) / 3;
  }
  let mag = Math.sqrt(xTot * xTot + yTot * yTot) * 0.8;
  let angle = Math.atan2(yTot, xTot);
  resVect = new Vector("black", mag, angle);
  return resVect;
}
