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

// Conductor
let conductor = new Conductor();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //inductor.draw(ctx);
  conductor.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    //inductor.toggle();
  }
}
