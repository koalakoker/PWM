class Conductor {
  constructor() {
    this.a = new Point(100, 200);
    this.b = new Point(200, 50);
    this.off = 0;
    this.segment = 5;
  }
  draw(ctx) {
    // Frame
    drawLine(ctx, this.a, this.b, "black", 4);
    // Electron
    let a = this.a;
    for (let e = 0; e < this.segment; e++) {
      let b = lerpPoint(this.a, this.b, (e + 1) / this.segment);
      let ePos = lerpPoint(a, b, this.off);
      drawPoint(ctx, ePos, "red", 5);
      a = b;
    }
    // Update
    this.update();
  }
  update() {
    this.off += 0.05;
    if (this.off >= 1) {
      this.off = 0;
    }
  }
}
