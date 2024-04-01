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
let intervalID = setInterval(draw, 1000 / fps);
let running = true;
let isOn = false;

let inductiveCircuit = new InductiveCirciut();
//let rotatingFlux = new RotatingFlux();

//let triSinSignal = new TriSinSignal(canvas.height);
let sinSignal = new SinSignal("red", 3, 50, 3, 700, 1100, canvas.height / 2);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (typeof sinSignal !== "undefined") {
    sinSignal.draw(ctx);
  }
  if (typeof triSinSignal !== "undefined") {
    triSinSignal.draw(ctx);
  }
  if (typeof inductiveCircuit !== "undefined") {
    inductiveCircuit.draw(ctx);
  }
  if (typeof rotatingFlux !== "undefined") {
    rotatingFlux.draw(ctx);
  }
}

function keypressed(e) {
  if (e.code === "Space") {
    isOn = !isOn;
    if (typeof sinSignal !== "undefined") {
      sinSignal.toggle();
    }
    if (typeof triSinSignal !== "undefined") {
      triSinSignal.toggle();
    }
    if (typeof inductiveCircuit !== "undefined") {
      inductiveCircuit.toggle();
    }
    if (typeof rotatingFlux !== "undefined") {
      rotatingFlux.toggle();
    }
  }
  if (e.code === "ArrowRight") {
    draw();
  }
  if (e.code === "KeyP") {
    if (running) {
      clearInterval(intervalID);
      running = false;
    } else {
      intervalID = setInterval(draw, 1000 / fps);
      running = true;
    }
  }
}
