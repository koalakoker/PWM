class Inductor extends TogglableElemtnt {
  constructor(amp, xStart, xEnd, y0, wave) {
    super(() => {
      this.th = 0;
      this.speed = 0;
    });
    this.amp = amp;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.y0 = y0;
    this.wave = wave;

    this.dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    this.off = 0;
    this.step = 5;
    this.speed = 0.0;
    this.th = 0;
    this.flux = new Vector("blue", this.speed, 0, {
      x: (xEnd + xStart) / 2,
      y: y0,
    });
  }

  animate() {
    this.speed = Math.sin(this.th);
    this.flux.mag = this.speed;
    this.th += 0.01;
  }

  draw(ctx) {
    this.frame(ctx);
    if (this.isOn()) {
      this.flux.draw(ctx);
      this.electron(ctx);
    }
    this.animate();
  }

  electron(ctx) {
    let p = new Point();
    for (p.x = xStart + this.off; p.x < xEnd; p.x += this.step) {
      p.y = parseInt(this.calc(p.x));
      drawPoint(ctx, p, "red", 5);
    }
    this.off += this.speed;
    if (this.off > this.step) {
      this.off = 0;
    }
  }

  frame(ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.beginPath();

    let y;
    let th = 0;
    let dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    ctx.moveTo(this.xStart, this.y0);
    for (let x = this.xStart; x <= this.xEnd; x += 1) {
      y = this.y0 + this.amp * Math.sin(th);
      th += dTh;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
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
