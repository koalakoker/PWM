class Output {
  constructor() {
    this.onLevel = 100;
    this.margin = 10;
  }
  draw(ctx) {
    let startX = this.PWM.getStartX();
    let bottomLevel = this.PWM.origin.y + this.margin + this.onLevel;
    startPoly(ctx, new Point(startX, bottomLevel), "red", 3);
    for (let x = 0; x < this.PWM.length; x++) {
      let pOn = new Point(startX + x, bottomLevel + this.onLevel);
      let pOff = new Point(startX + x, bottomLevel);
      if (this.PWM.counter.counterValues[x] >= this.PWM.compare.val) {
        moveTo(ctx, pOn);
      } else {
        moveTo(ctx, pOff);
      }
    }
    endPoly(ctx);
  }
}
