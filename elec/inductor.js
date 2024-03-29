class Inductor extends TogglableElemtnt {
  constructor(amp, xStart, xEnd, y0, wave, width) {
    super(() => {
      this.th = 0;
      this.speed = 0;
    });
    this.amp = amp;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.y0 = y0;
    this.wave = wave;
    this.width = width;

    this.dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    this.off = 0;
    this.step = 5;
    this.speed = 0.0;
    this.th = 0;
    this.omega = 0.04;
    this.flux = new Vector("blue", this.speed, 0, {
      x: (xEnd + xStart) / 2,
      y: y0,
    });
  }

  animate() {
    this.speed = Math.sin(this.th);
    this.flux.mag = this.speed;
    this.th += this.omega;
    this.off += this.speed;
    if (this.off > this.step) {
      this.off = 0;
    }
  }

  draw(ctx) {
    this.drawframe(ctx);
    if (this.isOn()) {
      this.flux.draw(ctx);
      this.drawElectron(ctx);
    }
    this.animate();
  }

  drawElectron(ctx) {
    let p = new Point();
    for (p.x = xStart + this.off; p.x < xEnd; p.x += this.step) {
      p.y = parseInt(this.calc(p.x));
      drawPoint(ctx, p, "red", 5);
    }
  }

  drawframe(ctx) {
    let y;
    let a = new Point(this.xStart, this.y0);
    let b = new Point();
    for (b.x = this.xStart; b.x <= this.xEnd; b.x += 1) {
      b.y = this.calc(b.x);
      drawLine(ctx, a, b, "black", this.width);
      a.x = b.x;
      a.y = b.y;
    }
  }

  circuit(ctx) {}

  calc(x) {
    if (x >= this.xStart && x <= this.xEnd) {
      let i = x - this.xStart;
      let y = this.y0 + this.amp * Math.sin(this.dTh * i);
      return y;
    }
    return;
  }
}
