class Counter {
  static countingUp = 0;
  static countingUpDown = 1;
  static countingDown = 2;
  constructor(arr, mode) {
    this.arr = arr;
    this.mode = mode;
    this.periods = 3;
    this.startCounting();
    this.counterValues = [];
  }
  draw(ctx) {
    this.startCounting();
    startPoly(ctx, this.PWM.origin, "black", 3);
    for (let x = 0; x < this.PWM.length; x++) {
      let y = this.getCounter();
      this.counterValues[x] = y;
      moveTo(ctx, new Point(this.PWM.origin.x + x, this.PWM.origin.y - y));
      this.step();
    }
    endPoly(ctx);
  }
  getCounter() {
    return this.counter;
  }
  step() {
    if (this.mode === Counter.countingUp) {
      this.counter += 1;
      if (this.counter > this.arr) {
        this.counter = 0;
      }
    } else if (this.mode === Counter.countingDown) {
      this.counter -= 1;
      if (this.counter < 0) {
        this.counter = this.arr;
      }
    } else if (this.mode === Counter.countingUpDown) {
      if (this.direction === 0) {
        this.counter += 1;
        if (this.counter > this.arr) {
          this.counter = this.arr - 1;
          this.direction = 1;
        }
      } else {
        this.counter -= 1;
        if (this.counter < 0) {
          this.counter = 1;
          this.direction = 0;
        }
      }
    }
    return this.counter;
  }
  startCounting() {
    if (
      this.mode === Counter.countingUp ||
      this.mode === Counter.countingUpDown
    ) {
      this.counter = 0;
    }
    if (this.mode === Counter.countingDown) {
      this.counter = this.arr;
    }
    this.direction = 0;
  }
  update(v) {
    this.arr = v;
  }
}
