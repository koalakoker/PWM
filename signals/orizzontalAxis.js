class OrizzontalAxis extends Axis {
  constructor(o, min, max, color, width) {
    super(o, min, max, color, width);
  }
  draw(ctx) {
    this.a = new Point(this.o.x + this.min, this.o.y);
    this.b = new Point(this.o.x + this.max, this.o.y);
    super.draw(ctx);
  }
}
