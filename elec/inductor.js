class Inductor extends TogglableElemtnt {
  constructor(
    amp,
    xStart,
    xEnd,
    y0,
    wave,
    width,
    angle = 0,
    fluxColor = "blue"
  ) {
    super(() => {
      this.th = angle;
      this.speed = Math.sin(this.th);
    });
    this.amp = amp;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.y0 = y0;
    this.wave = wave;
    this.width = width;
    this.angle = angle;

    this.dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    this.off = 0;
    this.step = 5;
    this.th = angle;
    this.speed = Math.sin(this.th);
    this.speedFactor = 1;
    this.omega = 0.04;
    this.flux = new Vector(fluxColor, this.speed, 0, {
      x: xStart,
      y: y0,
    });
  }

  animate() {
    this.speed = Math.sin(this.th);
    this.flux.mag = this.speed;
    this.th += this.omega;
    this.off += this.speed * this.speedFactor;
    if (this.off > this.step) {
      this.off = 0;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(300, 300);
    ctx.rotate(this.angle);

    this.drawframe(ctx);
    if (this.isOn()) {
      this.flux.draw(ctx);
      this.drawElectron(ctx);
    }
    ctx.restore();
    this.animate();
  }

  drawElectron(ctx) {
    let p = new Point();
    for (p.x = this.xStart + this.off; p.x < this.xEnd; p.x += this.step) {
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
