class FOC extends Vector {
  constructor(rotor, color, mag, angle, center) {
    super(color, mag, angle, center);
    this.rotor = rotor;
  }

  update(dt) {
    this.angle = this.rotor.angle + Math.PI / 2;
  }
}
