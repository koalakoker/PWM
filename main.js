let canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");
let rotor = new MechVector(0.2, 2, "purple", 200, 0);
let stator = new ManualVector(canvas, "black", 200, Math.PI / 2);
//stator.speed = rpm2rads(30);
let motor = new Motor(stator, rotor);
let fps = 60;
let dt = 1 / fps;

setInterval(draw, 1000 / fps);

function draw() {
  clearCanvas(ctx);
  ctx.save();
  ctx.translate(canvas.height / 2, canvas.height / 2);
  motor.update(dt);
  rotor.draw(ctx);
  rotor.update(dt);
  stator.draw(ctx);
  stator.update(dt);
  ctx.restore();
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
