let canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 600;
let ctx = canvas.getContext("2d");
let rotor = new MechVector(0.2, 2, "purple", 200, 0);
let autoStator = new Vector("black", 200, 0);
let manualStator = new ManualVector(canvas, "black", 200, Math.PI / 2);
let motor = new Motor(manualStator, rotor);
let fps = 60;
let dt = 1 / fps;

// Inputs
let rpm = document.getElementById("rpm");
rpm.value = 60;

setInterval(draw, 1000 / fps);

var autoRadioButton = document.querySelector(
  'input[name="option"][value="auto"]'
);
var focRadioButton = document.querySelector(
  'input[name="option"][value="foc"]'
);
var manualRadioButton = document.querySelector(
  'input[name="option"][value="manual"]'
);

// Function to handle radio button change event
function handleRadioButtonChange() {
  if (autoRadioButton.checked) {
    // Auto radio button is selected, perform auto action
    autoStator.angle = manualStator.angle;
    autoStator.speed = rpm2rads(rpm.value);
    motor.stator = autoStator;
  } else if (manualRadioButton.checked) {
    // Manual radio button is selected, perform manual action
    manualStator.angle = autoStator.angle;
    motor.stator = manualStator;
  } else {
    console.log("FOC");
  }
}

// Add event listener to the radio buttons
autoRadioButton.addEventListener("change", handleRadioButtonChange);
manualRadioButton.addEventListener("change", handleRadioButtonChange);
focRadioButton.addEventListener("change", handleRadioButtonChange);

rpm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    autoStator.speed = rpm2rads(rpm.value);
  }
});

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
  }

  ctx.restore();
}

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
