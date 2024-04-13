class PWM {
  constructor(origin, counter, compare) {
    this.origin = origin;
  }
  createCounter(arr, mode) {
    this.counter = new Counter(arr, mode);
    this.counter.PWM = this;
    this.length = this.counter.arr * this.counter.periods + 1;
    this.compares = [];
  }
  addCompare(val, mode, color) {
    let compare = new Compare(val, color);
    compare.PWM = this;

    let output = new Output(mode);
    output.PWM = this;
    output.compare = compare;
    output.index = this.compares.length;

    this.compares.push({ compare: compare, output: output });
  }
  draw(ctx) {
    this.counter.draw(ctx); // Value of counter is stored in this.counter.counterValues

    // Draw in reverse order because the first is the most foreground element
    const reversedArray = [...this.compares].reverse();
    reversedArray.forEach((element) => {
      element.compare.draw(ctx);
      element.output.draw(ctx);
    });
  }
  getStartX() {
    return this.origin.x;
  }
  getEndX() {
    return this.origin.x + this.length;
  }
  getDuty(index) {
    let compare = this.compares[index].compare;
    let output = this.compares[index].output;
    let duty;
    if (output.mode === 0) {
      duty = 1 - compare.val / this.counter.arr;
    } else {
      duty = compare.val / this.counter.arr;
    }
    if (duty < 0) {
      duty = 0;
    }
    if (duty > 1) {
      duty = 1;
    }
    return duty;
  }
  getCompareValue(index) {
    return this.compares[index].compare.val;
  }
  update(duty, index) {
    let compare = this.compares[index].compare;
    let output = this.compares[index].output;
    if (output.mode === 0) {
      compare.update((1 - duty) * this.counter.arr);
    } else {
      compare.update(duty * this.counter.arr);
    }
  }
  mouseDown(p) {
    for (let i = 0; i < this.compares.length; i++) {
      if (this.compares[i].compare.mouseDown(p)) break;
      if (this.compares[i].output.mouseDown(p)) break;
    }
  }
  mouseMove(p) {
    for (let i = 0; i < this.compares.length; i++) {
      this.compares[i].compare.mouseMove(p);
      this.compares[i].output.mouseMove(p);
    }
  }
  mouseUp(p) {
    for (let i = 0; i < this.compares.length; i++) {
      this.compares[i].compare.mouseUp(p);
      this.compares[i].output.mouseUp(p);
    }
  }
}
