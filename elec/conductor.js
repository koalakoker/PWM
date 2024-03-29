class Conductor extends TogglableElemtnt {
  constructor() {
    super(() => {
      this.off = 0;
    });
    this.a = new Point(100, 200);
    this.b = new Point(200, 50);
    this.off = 0;
    this.segment = 5;
    this.speed = 0.05;
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
    this.off += this.speed;
    if (this.off >= 1) {
      this.off = 0;
    }
  }
}
