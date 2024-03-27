class PI {
  constructor(kp, ki) {
    this.kp = kp;
    this.ki = ki;
    this.intTerm = 0;
  }

  calc(err) {
    this.intTerm += this.ki * err;
    return this.kp * err + this.intTerm;
  }
}
