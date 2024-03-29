class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function lerpPoint(a, b, o) {
  let x = lerp(a.x, b.x, o);
  let y = lerp(a.y, b.y, o);
  return new Point(x, y);
}
