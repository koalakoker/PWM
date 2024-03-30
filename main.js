// Canvas Init
let canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");

// Animation Set and run
let fps = 60;
let dt = 1 / fps;
setInterval(draw, 1000 / fps);

// Inductor
let len = 200;
let amp = 25;
let angle = 0;
let wave = 10;

let fluxColor = ["red", "green", "blue"];
let circuit = new Circuit();
for (let i = 0; i < 3; i++) {
  let inductor = new Inductor(amp, 0, len, 0, wave, 3, angle, fluxColor[i]);
  inductor.th = angle;
  circuit.add(inductor);
  angle += (2 * Math.PI) / 3;
}

//draw();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circuit.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    circuit.toggle();
  }
}
