class TogglableElemtnt {
  constructor(cb) {
    this.on = false;
    this.cb = cb;
  }
  toggle() {
    this.on = !this.on;
    this.cb();
  }
  isOn() {
    return this.on;
  }
}
