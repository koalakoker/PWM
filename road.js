class Road {
  constructor(center, width, lines) {
    this.width = width;
    this.lines = lines;

    this.left = center - this.width / 2;
    this.right = center + this.width / 2;
    this.top = 1000000;
    this.bottom = -this.top;
  }

  draw(ctx) {
    this.drawBorder(ctx);
    this.drawLines(ctx);
  }

  drawBorder() {
    ctx.beginPath();
    ctx.moveTo(this.left, this.bottom);
    ctx.lineTo(this.left, this.top);
    ctx.moveTo(this.right, this.bottom);
    ctx.lineTo(this.right, this.top);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();
  }

  drawLines(ctx) {
    ctx.beginPath();
    ctx.setLineDash([20, 20]);

    let cWidth = this.width / this.lines;
    for (let i = 0; i < this.lines - 1; i++) {
      ctx.moveTo(this.left + cWidth * (i + 1), this.bottom);
      ctx.lineTo(this.left + cWidth * (i + 1), this.top);
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}
