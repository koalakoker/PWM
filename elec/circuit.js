class Circuit {
  constructor() {
    this.element = [];
  }
  add(element) {
    this.element.push(element);
  }
  draw(ctx) {
    this.element.forEach((element) => {
      element.draw(ctx);
    });
  }
  toggle() {
    this.element.forEach((element) => {
      element.toggle();
    });
  }
}
