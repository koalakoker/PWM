let canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");
let rotor = new MechVector(inertia.value, friction.value, "purple", 200, 0);
let autoStator = new Vector("black", 200, 0);
let manualStator = new ManualVector(canvas, "black", 200, 0);
let focStator = new FOC(
  rpm2rads(rpm.value),
  kp.value,
  ki.value,
  rotor,
  "black",
  200,
  0
);
let motor = new Motor(manualStator, rotor);
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
  if (autoRadioButton.checked) {
    autoStator.draw(ctx);
    autoStator.update(dt);
  } else if (manualRadioButton.checked) {
    manualStator.draw(ctx);
    manualStator.update(dt);
  } else {
    focStator.draw(ctx);
    focStator.update(dt);
  }
  speed.textContent = "Speed: " + Math.trunc(rads2rpm(rotor.speed));

  ctx.restore();
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
