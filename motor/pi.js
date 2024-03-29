class PI {
  constructor(kp, ki, sat, intBound) {
    this.kp = kp;
    this.ki = ki;
    this.sat = sat;
    this.intBound = intBound;
    this.intTerm = 0;
  }

  calc(err) {
    this.intTerm += this.ki * err;
    if (this.intTerm > this.intBound) {
      this.intTerm = this.intBound;
    } else if (this.intTerm < -this.intBound) {
      this.intTerm = -this.intBound;
    }
    let out = this.kp * err + this.intTerm;
    if (out > this.sat) {
      out = this.sat;
    } else if (out < -this.sat) {
      out = -this.sat;
    }
    return out;
  }
}
