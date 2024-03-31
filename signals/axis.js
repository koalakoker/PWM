class Axis {
  constructor(o, len, color, width) {
    this.color = color;
    this.width = width;
    this.o = o;
    this.len = len;
    this.a = 0;
    this.b = 0;
  }
  draw(ctx) {
    drawArrow(ctx, this.a, this.b, this.color, this.width, 15);
  }
}
