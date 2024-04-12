class Compare extends Observable {
  constructor(val) {
    super();
    this.val = val;
    this.margin = 10;
    this.click = false;
  }
  draw(ctx) {
    let xStart = this.PWM.getStartX();
    let xStop = this.PWM.getEndX();
    let y = this.getY();
    drawLine(ctx, new Point(xStart, y), new Point(xStop, y), "red", 2, [5, 5]);
  }
  getY() {
    return this.PWM.origin.y - this.val;
  }
  over(p) {
    let over = false;
    if (
      p.x > this.PWM.getStartX() &&
      p.x < this.PWM.getEndX() &&
      p.y > this.getY() - this.margin &&
      p.y < this.getY() + this.margin
    ) {
      over = true;
    }
    return over;
  }
  setValFromP(p) {
    this.val = this.PWM.origin.y - p.y;
    this.notifyObservers();
  }
  update(v) {
    this.val = v;
    this.notifyObservers();
  }
  mouseDown(p) {
    if (this.over(p)) {
      canvas.style.cursor = "move";
      this.click = true;
    }
  }
  mouseMove(p) {
    if (!this.click) {
      if (this.over(p)) {
        canvas.style.cursor = "pointer";
      }
    } else {
      this.setValFromP(p);
    }
  }
  mouseUp(p) {
    this.click = false;
  }
}
