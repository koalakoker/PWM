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
let amp = 50;
let xStart = 100;
let xEnd = canvas.width - 100;
let y0 = canvas.height / 2;
let wave = 10;
let leg = 50;
let inductor = new Inductor(amp, xStart, xEnd, y0, wave, leg);

let circuit = new Circuit();
circuit.add(inductor);
circuit.add(
  new Conductor(new Point(xStart - leg, y0), new Point(xStart, y0), 2)
);
circuit.add(new Conductor(new Point(xEnd, y0), new Point(xEnd + leg, y0), 2));
circuit.add(
  new Conductor(
    new Point(xStart - leg, y0 + 2 * leg),
    new Point(xStart - leg, y0),
    4
  )
);
circuit.add(
  new Conductor(
    new Point(xEnd + leg, y0),
    new Point(xEnd + leg, y0 + 2 * leg),
    4
  )
);
circuit.add(
  new Conductor(
    new Point(xEnd + leg, y0 + 2 * leg),
    new Point(xStart - leg, y0 + 2 * leg),
    16
  )
);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circuit.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    circuit.toggle();
  }
}
