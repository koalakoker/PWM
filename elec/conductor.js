class Conductor extends TogglableElemtnt {
  constructor(a, b, segment) {
    super(() => {
      this.off = 0;
      this.th = 0;
    });
    this.a = a;
    this.b = b;
    this.off = 0;
    this.segment = segment;
    this.speed = 0;
    this.th = 0;
    this.omega = 0.04;
  }
  draw(ctx) {
    // Frame
    drawLine(ctx, this.a, this.b, "black", 4);

    if (this.isOn()) {
      this.drawElectron();
    }

    // Update
    this.update();
  }
  drawElectron() {
    let a = this.a;
    for (let e = 0; e < this.segment; e++) {
      let b = lerpPoint(this.a, this.b, (e + 1) / this.segment);
      let ePos = lerpPoint(a, b, this.off);
      drawPoint(ctx, ePos, "red", 5);
      a = b;
    }
  }
  update() {
    this.speed = Math.sin(this.th) / 10;
    this.th += this.omega;
    this.off += this.speed;
    if (this.off > 1) {
      this.off = 0;
    }
    if (this.off < 0) {
      this.off = 1;
    }
  }
}
