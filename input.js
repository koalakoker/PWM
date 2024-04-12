class InputCtrl {
  constructor(input, obj, inc = 1, digit = 2) {
    this.input = input;
    this.obj = obj;
    this.inc = inc;
    this.digit = digit;
    this.regiserListeners();
    this.mouseMoveF = null;
  }

  mouseMoveHandler(e) {
    let newEvent = new CustomEvent("changedPos", {
      detail: { x: e.x, y: e.y },
    });
    this.input.dispatchEvent(newEvent);
  }

  regiserListeners() {
    this.input.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        this.obj.update(this.input.value);
      }
    });

    this.input.addEventListener("changedPos", (e) => {
      let dy = e.detail.y - this.input.lastPos.y;
      this.input.value = parseFloat(
        parseFloat(this.input.value) + dy * this.inc
      ).toFixed(this.digit);
      this.obj.update(parseFloat(this.input.value));
      this.input.lastPos = new Point(e.detail.x, e.detail.y);
    });

    this.input.addEventListener("mousedown", (e) => {
      this.input.lastPos = new Point(e.x, e.y);
      this.mouseMoveF = (e) => this.mouseMoveHandler(e);
      document.addEventListener("mousemove", this.mouseMoveF);
    });

    document.addEventListener("mouseup", (e) => {
      document.removeEventListener("mousemove", this.mouseMoveF);
    });
  }

  set(v) {
    this.input.value = parseFloat(v).toFixed(this.digit);
  }
}
