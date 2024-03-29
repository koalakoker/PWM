class ManualVector extends Vector {
  constructor(canvas, color, mag, angle, center) {
    super(color, mag, angle, center);
    this.mouseDown = false;
    canvas.addEventListener("mousemove", (e) => {
      if (this.mouseDown) {
        let rect = canvas.getBoundingClientRect();
        var x2 = e.clientX - rect.left;
        var y2 = e.clientY - rect.top;
        var y1 = canvas.height / 2;
        var x1 = canvas.width / 2;
        this.angle = Math.atan2(y1 - y2, x2 - x1);
      }
    });
    canvas.addEventListener("mousedown", () => {
      this.mouseDown = true;
    });
    canvas.addEventListener("mouseup", () => {
      this.mouseDown = false;
    });
  }
  update(dt) {}
}
