class ManualVector extends Vector {
  constructor(canvas, color, mag, angle, center) {
    super(color, mag, angle, center);
    canvas.addEventListener("mousemove", (e) => {
      let rect = canvas.getBoundingClientRect();
      var x2 = e.clientX - rect.left;
      var y2 = e.clientY - rect.top;
      var y1 = canvas.height / 2;
      var x1 = canvas.width / 2;
      this.angle = Math.atan2(y1 - y2, x2 - x1);
    });
  }
  update(dt) {}
}
