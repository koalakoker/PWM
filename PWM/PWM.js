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
    if (duty < 0) {
      duty = 0;
    }
    if (duty > 1) {
      duty = 1;
    }
    return duty;
  }
  getCompareValue() {
    return this.compare.val;
  }
  update(duty) {
    if (this.output.mode === 0) {
      this.compare.update((1 - duty) * this.counter.arr);
    } else {
      this.compare.update(duty * this.counter.arr);
    }
  }
  mouseDown(p) {
    this.compare.mouseDown(p);
    this.output.mouseDown(p);
  }
  mouseMove(p) {
    this.compare.mouseMove(p);
    this.output.mouseMove(p);
  }
  mouseUp(p) {
    this.compare.mouseUp(p);
    this.output.mouseUp(p);
  }
}
