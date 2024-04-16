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

let pwmMargin = 20;
let pwm = new PWM(new Point(pwmMargin, 250), canvas.width - pwmMargin * 2);
pwm.createCounter(initARR, Counter.countingUp);
pwm.addCompare(initCCR, 0, "red");
pwm.addCompare(initCCR, 0, "green");
pwm.addCompare(initCCR, 0, "blue");

let com = new Comm(20, () => {
  let arrayBuffer = new ArrayBuffer(12);
  let dataView = new DataView(arrayBuffer);
  dataView.setUint16(0, pwm.counter.getARR(), true);
  dataView.setUint8(2, pwm.counter.getCountingMode());
  dataView.setUint16(3, pwm.getCompareValue(0), true);
  dataView.setUint8(5, pwm.compares[0].output.mode);
  dataView.setUint16(6, pwm.getCompareValue(1), true);
  dataView.setUint8(8, pwm.compares[1].output.mode);
  dataView.setUint16(9, pwm.getCompareValue(2), true);
  dataView.setUint8(11, pwm.compares[2].output.mode);
  return arrayBuffer;
});

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

function mouseDown(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  pwm.mouseDown(p);
}

function mouseMove(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  canvas.style.cursor = "default";
  pwm.mouseMove(p);
}

function mouseUp(e) {
  let p = getPosOnCanvas(new Point(e.x, e.y));
  pwm.mouseUp(p);
  canvas.style.cursor = "default";
}

function getPosOnCanvas(p) {
  let rect = canvas.getBoundingClientRect();
  let cX = rect.left;
  let cY = rect.top;
  return new Point(p.x - cX, p.y - cY);
}

let sinModTimer;
let t = 0;
let ts = 0.01;
let freq = 1;
let omega = 2 * Math.PI * freq;
let sinModBTN = document.getElementById("sinModulationBTN");

function sinModulation() {
  if (sinModTimer === undefined) {
    sinModBTN.textContent = "Stop Modulation";
    sinModTimer = setInterval(() => {
      t += ts;
      da = 0.5 * (1 + Math.sin(omega * t));
      db = 0.5 * (1 + Math.sin(omega * t + (Math.PI * 2) / 3));
      dc = 0.5 * (1 + Math.sin(omega * t - (Math.PI * 2) / 3));

      pwm.update(da, 0);
      pwm.update(db, 1);
      pwm.update(dc, 2);
    }, ts * 1000);
  } else {
    clearTimeout(sinModTimer);
    sinModTimer = undefined;
    sinModBTN.textContent = "Start Modulation";
  }
}
