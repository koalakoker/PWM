class Vector {
  constructor(color, mag, angle, center = { x: 0, y: 0 }) {
    this.color = color;
    this.lineWidth = 20;
    this.mag = mag;
    this.angle = angle;
    this.center = center;
    this.speed = 0;
  }

  draw(ctx) {
    let x1 = this.center.x,
      y1 = this.center.y,
      x2 = x1 + this.mag * Math.cos(this.angle),
      y2 = y1 - this.mag * Math.sin(this.angle);
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
    x2 += this.lineWidth * Math.cos(this.angle);
    y2 -= this.lineWidth * Math.sin(this.angle);
    ctx.moveTo(
      x2 - arrowSize * Math.cos(this.angle - Math.PI / 6),
      y2 + arrowSize * Math.sin(this.angle - Math.PI / 6)
    );
    ctx.lineTo(x2, y2);
    ctx.lineTo(
      x2 - arrowSize * Math.cos(this.angle + Math.PI / 6),
      y2 + arrowSize * Math.sin(this.angle + Math.PI / 6)
    );
    ctx.lineTo(
      x2 - arrowSize * Math.cos(this.angle - Math.PI / 6),
      y2 + arrowSize * Math.sin(this.angle - Math.PI / 6)
    );
    ctx.fill();
  }

  update(dt) {
    this.angle += this.speed * dt;
  }
}
