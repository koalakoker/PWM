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
let leg = 50;
let xStart = 100;
let xEnd = canvas.width - 100;
let y0 = canvas.height / 2 - leg * 2;
let wave = 10;
let bottomY = y0 + 4 * leg;
let inductor = new Inductor(amp, xStart, xEnd, y0, wave, 4);

// GenSin
let genSin = new GenSin(new Point(canvas.width / 2, bottomY), 30, 4, 14, 2);

let circuit = new Circuit();
circuit.add(inductor);
circuit.add(
  new Conductor(new Point(xStart - leg, y0), new Point(xStart, y0), 2)
);
circuit.add(new Conductor(new Point(xEnd, y0), new Point(xEnd + leg, y0), 2));
circuit.add(
  new Conductor(
    new Point(xStart - leg, bottomY),
    new Point(xStart - leg, y0),
    8
  )
);
circuit.add(
  new Conductor(new Point(xEnd + leg, y0), new Point(xEnd + leg, bottomY), 8)
);
circuit.add(
  new Conductor(
    new Point(genSin.center.x - genSin.rad, bottomY),
    new Point(xStart - leg, bottomY),
    8
  )
);
circuit.add(
  new Conductor(
    new Point(xEnd + leg, bottomY),
    new Point(genSin.center.x + genSin.rad, bottomY),
    8
  )
);

// // Set Omega
// circuit.element.forEach((element) => {
//   element.omega = 0;
//   element.th = Math.PI / 2;
// });

//draw();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circuit.draw(ctx);
  genSin.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    circuit.toggle();
  }
}
