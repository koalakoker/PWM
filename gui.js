document.addEventListener("keydown", keypressed);
document.addEventListener("mousedown", mouseDown);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("mouseup", mouseUp);

let Counting = document.getElementById("Counting");

Counting.addEventListener("change", () => {
  pwm.counter.mode = Counting.selectedIndex;
});

let ARR = document.getElementById("ARR");
let ARRInput = new InputCtrl(ARR, pwm.counter, 1, 0);
ARRInput.set(initARR);

let PWM_Mode1 = document.getElementById("PWM_Mode1");
PWM_Mode1.addEventListener("change", () => {
  pwm.compares[0].output.mode = PWM_Mode1.selectedIndex;
});

let CCR1 = document.getElementById("Compare1");
let CCRInput1 = new InputCtrl(CCR1, pwm.compares[0].compare, 1, 0);
CCRInput1.set(initCCR);

let CCR2 = document.getElementById("Compare2");
let CCRInput2 = new InputCtrl(CCR2, pwm.compares[1].compare, 1, 0);
CCRInput2.set(initCCR);

let CCR3 = document.getElementById("Compare3");
let CCRInput3 = new InputCtrl(CCR3, pwm.compares[2].compare, 1, 0);
CCRInput3.set(initCCR);

let Duty1 = document.getElementById("Duty1");
let DutyInput1 = new InputCtrl(Duty1, pwm, 0.01, 2, 0);
DutyInput1.set(initDuty);

let Duty2 = document.getElementById("Duty2");
let DutyInput2 = new InputCtrl(Duty2, pwm, 0.01, 2, 1);
DutyInput2.set(initDuty);

let Duty3 = document.getElementById("Duty3");
let DutyInput3 = new InputCtrl(Duty3, pwm, 0.01, 2, 2);
DutyInput3.set(initDuty);

pwm.counter.registerObserver(ARRInput, () => pwm.counter.getARR());
pwm.counter.registerObserver(DutyInput1, () => pwm.getDuty(0));
pwm.counter.registerObserver(DutyInput2, () => pwm.getDuty(1));
pwm.counter.registerObserver(DutyInput3, () => pwm.getDuty(2));

pwm.compares[0].compare.registerObserver(DutyInput1, () => pwm.getDuty(0));
pwm.compares[0].compare.registerObserver(CCRInput1, () =>
  pwm.getCompareValue(0)
);

pwm.compares[1].compare.registerObserver(DutyInput2, () => pwm.getDuty(1));
pwm.compares[1].compare.registerObserver(CCRInput2, () =>
  pwm.getCompareValue(1)
);

pwm.compares[2].compare.registerObserver(DutyInput3, () => pwm.getDuty(2));
pwm.compares[2].compare.registerObserver(CCRInput3, () =>
  pwm.getCompareValue(2)
);
