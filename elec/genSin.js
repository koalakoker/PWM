class GenSin {
  constructor(center, rad, borderWidth, margin, symbWidth) {
    this.center = center;
    this.rad = rad;
    this.borderWidth = borderWidth;
    this.margin = margin;

    this.sinSymb = new Inductor(
      this.rad - this.margin,
      new Point(this.center.x - this.rad + this.margin, this.center.y),
      2 * (this.rad - this.margin),
      1,
      symbWidth
    );
  }
  draw(ctx) {
    drawCircle(ctx, this.center, this.rad, "black", this.borderWidth);
    this.sinSymb.draw(ctx);
  }
}
