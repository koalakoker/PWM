document.addEventListener("keydown", keypressed);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);

let PWM1Button = document.querySelector('input[name="option"][value="PWM1"]');
let PWM2Button = document.querySelector('input[name="option"][value="PWM2"]');

function handleRadioButtonChange() {
  if (PWM1Button.checked) {
    pwm.output.mode = 0;
  } else if (PWM2Button.checked) {
    pwm.output.mode = 1;
  }
}

PWM1Button.addEventListener("change", handleRadioButtonChange);
PWM2Button.addEventListener("change", handleRadioButtonChange);

let ARR = document.getElementById("ARR");
let ARRInput = new InputCtrl(ARR, counter, 1, 0);
ARRInput.set(186);

let CCR = document.getElementById("Compare");
let CCRInput = new InputCtrl(CCR, compare, 1, 0);
CCRInput.set(186 / 4);

let Duty = document.getElementById("Duty");
let DutyInput = new InputCtrl(Duty, pwm, 0.01);
DutyInput.set(1 - 1 / 4);

compare.registerObserver(DutyInput, () => pwm.getDuty());
compare.registerObserver(CCRInput, () => pwm.getCompareValue());
