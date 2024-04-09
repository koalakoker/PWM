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
ARR.value = 186;
ARR.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    counter.update(ARR.value);
  }
});
ARR.addEventListener("changedPos", (e) => {
  let dy = e.detail.y - ARR.lastPos.y;
  ARR.value = parseInt(ARR.value) + dy;
  counter.update(ARR.value);
  ARR.lastPos = new Point(e.detail.x, e.detail.y);
});
function mouseMoveHandler(e) {
  let newEvent = new CustomEvent("changedPos", {
    detail: { x: e.x, y: e.y },
  });
  ARR.dispatchEvent(newEvent);
}
ARR.addEventListener("mousedown", (e) => {
  ARR.lastPos = new Point(e.x, e.y);
  document.addEventListener("mousemove", mouseMoveHandler);
});
document.addEventListener("mouseup", (e) => {
  document.removeEventListener("mousemove", mouseMoveHandler);
});
