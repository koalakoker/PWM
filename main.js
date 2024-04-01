// Canvas Init
let canvas = document.getElementById("myCanvas");
canvas.width = 1200;
canvas.height = 600;
let ctx = canvas.getContext("2d");
let cwh = canvas.width / 2;
let chh = canvas.height / 2;

// Animation Set and run
let fps = 60;
let dt = 1 / fps;
setInterval(draw, 1000 / fps);
let isOn = false;

let { circuit, genSin } = createInductor();

// Sin signal
let sinSignal = new SinSignal("red", 3, 50, 3, 700, 1100, chh);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sinSignal.draw(ctx);
  circuit.draw(ctx);
  genSin.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    isOn = !isOn;
    sinSignal.toggle();
    circuit.toggle();
  }
  if (e.code === "ArrowRight") {
    draw();
  }
}

function createInductor() {
  // Inductor
  let amp = 50;
  let leg = 50;
  let xStart = 100;
  let xEnd = 500;
  let y0 = chh - leg * 2;
  let wave = 10;
  let bottomY = y0 + 4 * leg;
  let inductor = new Inductor(
    amp,
    new Point(xStart, y0),
    xEnd - xStart,
    wave,
    4,
    0,
    "blue",
    { x: (xEnd - xStart) / 2, y: 0 }
  );

  // GenSin
  let genSin = new GenSin(
    new Point((xStart + xEnd) / 2, bottomY),
    30,
    4,
    14,
    2
  );

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
  return { circuit, genSin };
}
