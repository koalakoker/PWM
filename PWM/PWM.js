class PWM {
  constructor(arr, mode, origin) {
    this.counter = new Counter(arr, mode, origin);
    this.compare = new Compare();
    this.output = new Output();
  }
  draw(ctx) {
    this.counter.draw(ctx);
  }
}
