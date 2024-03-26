class Car {
  constructor(x, y, w, h) {
    this.controller = new Controller();

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = 0;
    this.totalBrake = 0;
    this.angle = 0;

    // Car proprieties
    this.maxPositiveSpeed = 3;
    this.maxNegativeSpeed = -4;
    this.acceleraton = 0.2;
    this.brakingForce = 0.03;
    this.fricton = 0.02;
  }

  draw(ctx) {
    this.update();

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);

    ctx.beginPath();
    ctx.rect(-this.w / 2, -this.h / 2, this.w, this.h);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  update() {
    this.controllerAction();
    this.frictionAndBraking();

    this.y += this.velocity * Math.cos(this.angle);
    this.x += this.velocity * Math.sin(this.angle);
  }

  controllerAction() {
    if (this.controller.up) {
      this.velocity -= this.acceleraton;
      if (this.velocity <= this.maxNegativeSpeed) {
        this.velocity = this.maxNegativeSpeed;
      }
    }
    if (this.controller.down) {
      this.velocity += this.acceleraton;
      if (this.velocity >= this.maxPositiveSpeed) {
        this.velocity = this.maxPositiveSpeed;
      }
    }
    if (this.controller.brake) {
      this.totalBrake = this.fricton + this.brakingForce;
    } else {
      this.totalBrake = this.fricton;
    }
    if (this.controller.right) {
      if (this.velocity <= 0) {
        this.angle -= 0.01;
      } else {
        this.angle += 0.01;
      }
    }
    if (this.controller.left) {
      if (this.velocity <= 0) {
        this.angle += 0.01;
      } else {
        this.angle -= 0.01;
      }
    }
  }

  frictionAndBraking() {
    if (this.velocity > 0) {
      this.velocity -= this.totalBrake;
    } else if (this.velocity < 0) {
      this.velocity += this.totalBrake;
    } else if (
      (this.velocity > 0 && this.velocity < this.totalBrake) ||
      (this.velocity < 0 && this.velocity > -this.totalBrake)
    ) {
      this.velocity = 0;
    }
  }
}
