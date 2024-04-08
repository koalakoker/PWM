// Canvas Init
let canvas = document.getElementById("myCanvas");
canvas.width = 600;
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

let counter = new Counter(186, Counter.countingUp);
let compare = new Compare(186 / 4);
let pwm = new PWM(new Point(20, 206), counter, compare);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pwm.draw(ctx);
}

function keypressed(e) {
  if (e.code === "Space") {
    isOn = !isOn;
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
