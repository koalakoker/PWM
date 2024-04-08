class PWM {
  constructor(origin, counter, compare) {
    this.origin = origin;
    this.counter = counter;
    this.counter.PWM = this;
    this.length = counter.arr * counter.periods + 1;
    this.compare = compare;
    this.compare.PWM = this;
    this.output = new Output();
    this.output.PWM = this;
  }
  draw(ctx) {
    this.counter.draw(ctx); // Value of counter is stored in this.counter.counterValues
    this.compare.draw(ctx);
    this.output.draw(ctx);
  }
  getStartX() {
    return this.origin.x;
  }
  getEndX() {
    return this.origin.x + this.length;
  }
}
