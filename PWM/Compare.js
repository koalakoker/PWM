class Compare {
  constructor(val) {
    this.val = val;
  }
  draw(ctx) {
    let xStart = this.PWM.getStartX();
    let xStop = this.PWM.getEndX();
    let y = this.PWM.origin.y - this.val;
    drawLine(ctx, new Point(xStart, y), new Point(xStop, y), "red", 2, [5, 5]);
  }
}
