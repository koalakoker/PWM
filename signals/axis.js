class Axis {
  constructor(o, min, max, color, width) {
    this.color = color;
    this.width = width;
    this.o = o;
    this.min = min;
    this.max = max;
    this.a = 0;
    this.b = 0;
  }
  draw(ctx) {
    drawArrow(ctx, this.a, this.b, this.color, this.width, 15);
  }
}
