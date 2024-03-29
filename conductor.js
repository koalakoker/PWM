class Conductor {
  constructor() {
    this.a = new Point(100, 200);
    this.b = new Point(200, 50);
    this.off = 0;
    this.segment = 1;
  }
  draw(ctx) {
    // Frame
    drawLine(ctx, this.a, this.b, "black", 4);
    // Electron
    let ePos = lerpPoint(this.a, this.b, this.off);
    drawPoint(ctx, ePos, "red", 5);
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
