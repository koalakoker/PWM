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

//let { circuit, genSin } = createInductor();

// Sin signal
let sinSignal = new SinSignal("red", 3, 50, 3, 700, 1100, chh);

let { rotFluxCircuit, fluxes } = createRotatingFlux();
let fluxVector = new Vector("black", 1, 0, { x: 300, y: 300 });

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (typeof sinSignal !== "undefined") {
    sinSignal.draw(ctx);
  }
  if (typeof circuit !== "undefined") {
    circuit.draw(ctx);
  }
  if (typeof genSin !== "undefined") {
    genSin.draw(ctx);
  }
  if (typeof rotFluxCircuit !== "undefined") {
    rotFluxCircuit.draw(ctx);
    if (isOn) {
      let { mag, angle } = computeResultantFlux();
      fluxVector.angle = angle;
      fluxVector.mag = mag;
      fluxVector.draw(ctx);
    }
  }
}

function keypressed(e) {
  if (e.code === "Space") {
    isOn = !isOn;
    if (typeof sinSignal !== "undefined") {
      sinSignal.toggle();
    }
    if (typeof circuit !== "undefined") {
      circuit.toggle();
    }
    if (typeof rotFluxCircuit !== "undefined") {
      rotFluxCircuit.toggle();
    }
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

function createRotatingFlux() {
  // Inductor
  let len = 200;
  let amp = 25;
  let angle = 0;
  let wave = 10;

  let fluxColor = ["red", "green", "blue"];
  let rotFluxCircuit = new Circuit();
  let fluxes = [];
  for (let i = 0; i < 3; i++) {
    let inductor = new Inductor(
      amp,
      new Point(300, 300),
      len,
      wave,
      3,
      angle,
      fluxColor[i]
    );
    fluxes.push(inductor.flux);
    rotFluxCircuit.add(inductor);
    angle += (2 * Math.PI) / 3;
  }
  return { rotFluxCircuit, fluxes };
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
  return { mag, angle };
}
