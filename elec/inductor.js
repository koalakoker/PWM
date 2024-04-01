class Inductor extends TogglableElement {
  constructor(
    amp,
    startPoint,
    len,
    wave,
    width,
    angle = 0,
    fluxColor = "blue",
    fluxCenter = {
      x: 0,
      y: 0,
    }
  ) {
    super(() => {
      this.th = angle;
      this.speed = Math.sin(this.th);
    });
    this.amp = amp;
    this.startPoint = startPoint;
    this.len = len;
    this.wave = wave;
    this.width = width;
    this.angle = angle;

    this.dTh = (this.wave * (2 * Math.PI)) / this.len;
    this.off = 0;
    this.step = 5;
    this.th = angle;
    this.speed = Math.sin(this.th);
    this.speedFactor = 1;
    this.omega = 0.04;
    this.flux = new Vector(fluxColor, this.speed, 0, fluxCenter);
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
    ctx.translate(this.startPoint.x, this.startPoint.y);
    ctx.rotate(this.angle);

    this.drawframe(ctx);
    if (this.isOn()) {
      this.flux.draw(ctx);
      this.drawElectron(ctx);
    }
    ctx.restore();
    this.animate();
  }

  drawframe(ctx) {
    let y;
    let a = new Point(0, 0);
    let b = new Point();
    for (b.x = 0; b.x <= this.len; b.x += 1) {
      b.y = this.calc(b.x);
      drawLine(ctx, a, b, "black", this.width);
      a.x = b.x;
      a.y = b.y;
    }
  }

  drawElectron(ctx) {
    let p = new Point();
    for (p.x = this.off; p.x < this.len; p.x += this.step) {
      p.y = parseInt(this.calc(p.x));
      drawPoint(ctx, p, "red", 5);
    }
  }

  calc(x) {
    if (x >= 0 && x <= this.len) {
      let y = this.amp * Math.sin(this.dTh * x);
      return y;
    }
    return;
  }
}
