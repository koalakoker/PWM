class MechVector extends Vector {
  constructor(inertia, friction, color, mag, angle, center = { x: 0, y: 0 }) {
    super(color, mag, angle, center);
    this.torque = 0;
    this.inertia = inertia;
    this.friction = friction;
  }

  update(dt) {
    this.speed +=
      (this.torque / this.inertia - this.friction * this.speed) * dt;
    super.update(dt);
  }

  applyTorque(torque) {
    this.torque = torque;
  }
}
