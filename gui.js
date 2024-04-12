document.addEventListener("keydown", keypressed);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);

let Counting = document.getElementById("Counting");

Counting.addEventListener("change", () => {
  pwm.counter.mode = Counting.selectedIndex;
});

let PWM_Mode = document.getElementById("PWM_Mode");

PWM_Mode.addEventListener("change", () => {
  pwm.output.mode = PWM_Mode.selectedIndex;
});

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
counter.registerObserver(ARRInput, () => pwm.counter.getARR());
counter.registerObserver(DutyInput, () => pwm.getDuty());
