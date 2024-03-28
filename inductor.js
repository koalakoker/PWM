class Inductor {
  constructor(amp, xStart, xEnd, y0, wave, leg) {
    this.amp = amp;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.y0 = y0;
    this.wave = wave;
    this.leg = leg;
    this.dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    this.off = 0;
    this.step = 5;
    this.speed = 0.0;
    this.th = 0;
    this.on = false;
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
    if (this.on) {
      this.flux.draw(ctx);
      this.electron(ctx);
    }
    this.animate();
  }

  electron(ctx) {
    ctx.fillStyle = "red";
    for (let x = xStart - leg + this.off; x < xEnd + leg; x += this.step) {
      let y = parseInt(this.calc(x));
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2, true); // Outer circle
      ctx.fill();
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

    let y = this.y0;
    let th = 0;
    let dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    ctx.moveTo(this.xStart - this.leg, y);
    ctx.lineTo(this.xStart, this.y0);
    for (let x = this.xStart; x <= this.xEnd; x += 1) {
      y = this.y0 + this.amp * Math.sin(th);
      th += dTh;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.xEnd + this.leg, this.y0);
    ctx.stroke();
  }

  calc(x) {
    if (x > this.xStart - this.leg && x < this.xStart) {
      return this.y0;
    }
    if (x > this.xEnd && x < this.xEnd + this.leg) {
      return this.y0;
    }
    if (x >= this.xStart && x <= this.xEnd) {
      let i = x - this.xStart;
      let y = this.y0 + this.amp * Math.sin(this.dTh * i);
      return y;
    }
    return;
  }

  toggle() {
    this.on = !this.on;
    this.th = 0;
    this.speed = 0;
  }
}
