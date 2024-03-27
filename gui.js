// RPM
let rpm = document.getElementById("rpm");
rpm.value = 60;

rpm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    autoStator.speed = rpm2rads(rpm.value);
  }
});

// Radio buttons - Stator mode
let autoRadioButton = document.querySelector(
  'input[name="option"][value="auto"]'
);
let focRadioButton = document.querySelector(
  'input[name="option"][value="foc"]'
);
let manualRadioButton = document.querySelector(
  'input[name="option"][value="manual"]'
);

function handleRadioButtonChange() {
  if (autoRadioButton.checked) {
    autoStator.angle = manualStator.angle;
    autoStator.speed = rpm2rads(rpm.value);
    motor.stator = autoStator;
  } else if (manualRadioButton.checked) {
    manualStator.angle = autoStator.angle;
    motor.stator = manualStator;
  } else {
    motor.stator = focStator;
  }
}

autoRadioButton.addEventListener("change", handleRadioButtonChange);
manualRadioButton.addEventListener("change", handleRadioButtonChange);
focRadioButton.addEventListener("change", handleRadioButtonChange);

// Motor Params
let inertia = document.getElementById("inertia");
inertia.value = 0.2;
inertia.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    rotor.inertia = inertia.value;
  }
});

let friction = document.getElementById("friction");
friction.value = 0.5;
friction.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    rotor.friction = friction.value;
  }
});

// Measured speed
let speed = document.getElementById("speed");
