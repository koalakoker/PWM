class OrizzontalAxis extends Axis {
  constructor(o, len, color, width) {
    super(o, len, color, width);
  }
  draw(ctx) {
    this.a = new Point(this.o.x, this.o.y);
    this.b = new Point(this.o.x + this.len, this.o.y);
    super.draw(ctx);
  }
}
