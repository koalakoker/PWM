class PWM {
  constructor(origin, counter, compare) {
    this.origin = origin;
    this.counter = counter;
    this.counter.PWM = this;
    this.length = counter.arr * counter.periods + 1;
    this.compare = compare;
    this.compare.PWM = this;
    this.output = new Output(0);
    this.output.PWM = this;
    this.duty = this.getDuty();
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
  getDuty() {
    let duty;
    if (this.output.mode === 0) {
      duty = 1 - compare.val / counter.arr;
    } else {
      duty = compare.val / counter.arr;
    }
    return duty;
  }
  update(duty) {
    if (this.output.mode === 0) {
      this.compare.val = (1 - duty) * this.counter.arr;
    } else {
      this.compare.val = duty * this.counter.arr;
    }
  }
}
