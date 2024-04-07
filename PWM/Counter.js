class Counter {
  static countingUp = 0;
  static countingUpDown = 1;
  static countingDown = 2;
  constructor(arr, mode, origin) {
    this.arr = arr;
    this.mode = mode;
    this.origin = origin;
    this.periods = 3;
  }
  draw(ctx) {
    startPoly(ctx, this.origin, "black", 3);
    for (let x = 0; x < this.arr * this.periods + 1; x++) {
      moveTo(ctx, new Point(this.origin.x + x, this.origin.y - this.calc(x)));
    }
    endPoly(ctx);
  }
  calc(x) {
    let y = x % this.arr;
    return y;
  }
}
