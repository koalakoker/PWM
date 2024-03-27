// RPM
let rpm = document.getElementById("rpm");
rpm.value = 50;

rpm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    autoStator.speed = rpm2rads(rpm.value);
    focStator.target = rpm2rads(rpm.value);
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
    if (rpm.value > 0) {
      autoStator.angle = rotor.angle + Math.PI / 2;
    } else if (rpm.value < 0) {
      autoStator.angle = rotor.angle - Math.PI / 2;
    } else {
      autoStator.angle = rotor.angle;
    }
    autoStator.speed = rpm2rads(rpm.value);
    motor.stator = autoStator;
  } else if (manualRadioButton.checked) {
    manualStator.angle = rotor.angle;
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

// Measure
let speed = document.getElementById("speed");
let torque = document.getElementById("torque");
let current = document.getElementById("current");

// Speed PI params
let kp = document.getElementById("kp");
kp.value = 5;
kp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    focStator.speedPI.kp = kp.value;
  }
});
let ki = document.getElementById("ki");
ki.value = 5;
ki.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    focStator.speedPI.ki = ki.value;
  }
});
