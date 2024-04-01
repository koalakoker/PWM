class SinSignal extends TogglableElement {
  constructor(color, width, amp, wave, xStart, xEnd, y0) {
    super(() => {
      this.offset = 0;
    });
    this.amp = amp;
    this.xStart = xStart;
    this.xEnd = xEnd;
    this.y0 = y0;
    this.wave = wave;
    this.color = color;
    this.width = width;
    this.dTh = (this.wave * (2 * Math.PI)) / (this.xEnd - this.xStart);
    let o = new Point(xStart, y0);
    this.oAx = new OrizzontalAxis(o, -30, xEnd - xStart + 30, "black", 2);
    this.vAx = new VerticalAxis(o, -(amp + 50), amp + 50, "black", 2);
    this.omega = 0.04;
  }

  draw(ctx) {
    this.drawLine(ctx);
    this.oAx.draw(ctx);
    this.vAx.draw(ctx);
    if (isOn) {
      this.drawPoint(ctx);
    }
  }

  drawLine(ctx) {
    let y;
    let a = new Point(this.xStart, this.y0);
    let b = new Point();
    for (b.x = this.xStart; b.x <= this.xEnd; b.x += 1) {
      b.y = this.calc(b.x);
      drawLine(ctx, a, b, this.color, this.width);
      a.x = b.x;
      a.y = b.y;
    }
  }

  drawPoint(ctx) {
    let x = lerp(this.xStart, this.xEnd, this.offset);
    let p = new Point(x, this.calc(x));
    drawPoint(ctx, p, "black", 5);

    let i = x - this.xStart;
    let a = this.vAx.a.add(i, 0);
    let b = this.vAx.b.add(i, 0);
    drawLine(ctx, a, b, "black", 2, [5, 5]);
    this.animatePoint();
  }

  animatePoint() {
    this.offset += this.omega / (Math.PI * 2 * this.wave);
    if (this.offset >= 1) {
      this.offset = 0;
    }
  }

  calc(x) {
    if (x >= this.xStart && x <= this.xEnd) {
      let i = x - this.xStart;
      let y = this.y0 - this.amp * Math.sin(this.dTh * i);
      return y;
    }
    return;
  }
}
