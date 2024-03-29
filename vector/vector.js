class Vector {
  constructor(color, mag, angle, center = { x: 0, y: 0 }) {
    this.color = color;
    this.lineWidth = 20;
    this.mag = mag;
    this.angle = angle;
    this.center = center;
    this.speed = 0;
    this.factor = 200; // 1Nm is represented by 200px
  }

  draw(ctx) {
    let x1 = this.center.x,
      y1 = this.center.y,
      x2 = x1 + this.mag * this.factor * Math.cos(this.angle),
      y2 = y1 - this.mag * this.factor * Math.sin(this.angle);
    let arrowSize = this.lineWidth + 20;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.lineWidth = 4;
    let sMag = this.mag / Math.abs(this.mag);
    x2 += this.lineWidth * sMag * Math.cos(this.angle);
    y2 -= this.lineWidth * sMag * Math.sin(this.angle);
    ctx.moveTo(
      x2 - arrowSize * sMag * Math.cos(this.angle - Math.PI / 6),
      y2 + arrowSize * sMag * Math.sin(this.angle - Math.PI / 6)
    );
    ctx.lineTo(x2, y2);
    ctx.lineTo(
      x2 - arrowSize * sMag * Math.cos(this.angle + Math.PI / 6),
      y2 + arrowSize * sMag * Math.sin(this.angle + Math.PI / 6)
    );
    ctx.lineTo(
      x2 - arrowSize * sMag * Math.cos(this.angle - Math.PI / 6),
      y2 + arrowSize * sMag * Math.sin(this.angle - Math.PI / 6)
    );
    ctx.fill();
  }

  update(dt) {
    this.angle += this.speed * dt;
  }
}
