const torqueMode = 0;
const speedMode = 1;
class FOC extends Vector {
  constructor(target, kp, ki, rotor, color, mag, angle, center) {
    super(color, mag, angle, center);
    this.rotor = rotor;
    this.mode = speedMode;
    this.magMax = mag;
    this.speedPI = new PI(kp, ki, mag, mag / 2);
    this.target = target;
  }

  update(dt) {
    if (this.mode === torqueMode) {
      this.mag = this.magMax;
    }
    if (this.mode === speedMode) {
      this.mag = this.speedPI.calc(this.target - this.rotor.speed);
    }
    this.angle = this.rotor.angle + Math.PI / 2;
  }
}
