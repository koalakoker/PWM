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

// Sin signal
let sinSignal = new SinSignal("red", 3, 50, 2, 100, 500, canvas.height / 2);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sinSignal.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    isOn = !isOn;
    sinSignal.toggle();
  }
  if (e.code === "ArrowRight") {
    draw();
  }
}
