class Motor {
  constructor(stator, rotor) {
    this.stator = stator;
    this.rotor = rotor;
  }

  update() {
    this.applyTorque();
  }

  applyTorque() {
    let theta = this.stator.angle - this.rotor.angle;
    let mag = this.stator.mag / this.rotor.mag;
    this.rotor.applyTorque(mag * Math.sin(theta));
  }
}
