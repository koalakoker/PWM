class VerticalAxis extends Axis {
  constructor(o, min, max, color, width) {
    super(o, min, max, color, width);
  }
  draw(ctx) {
    this.a = new Point(this.o.x, this.o.y - this.min);
    this.b = new Point(this.o.x, this.o.y - this.max);
    super.draw(ctx);
  }
}
