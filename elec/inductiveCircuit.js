class InductiveCirciut {
  constructor() {
    let amp = 50;
    let leg = 50;
    let xStart = 100;
    let xEnd = 500;
    let y0 = chh - leg * 2;
    let wave = 10;
    let bottomY = y0 + 4 * leg;
    let inductor = new Inductor(
      amp,
      new Point(xStart, y0),
      xEnd - xStart,
      wave,
      4,
      0,
      "blue",
      { x: (xEnd - xStart) / 2, y: 0 }
    );

    // GenSin
    this.genSin = new GenSin(
      new Point((xStart + xEnd) / 2, bottomY),
      30,
      4,
      14,
      2
    );

    this.circuit = new Circuit();
    this.circuit.add(inductor);
    this.circuit.add(
      new Conductor(new Point(xStart - leg, y0), new Point(xStart, y0), 2)
    );
    this.circuit.add(
      new Conductor(new Point(xEnd, y0), new Point(xEnd + leg, y0), 2)
    );
    this.circuit.add(
      new Conductor(
        new Point(xStart - leg, bottomY),
        new Point(xStart - leg, y0),
        8
      )
    );
    this.circuit.add(
      new Conductor(
        new Point(xEnd + leg, y0),
        new Point(xEnd + leg, bottomY),
        8
      )
    );
    this.circuit.add(
      new Conductor(
        new Point(this.genSin.center.x - this.genSin.rad, bottomY),
        new Point(xStart - leg, bottomY),
        8
      )
    );
    this.circuit.add(
      new Conductor(
        new Point(xEnd + leg, bottomY),
        new Point(this.genSin.center.x + this.genSin.rad, bottomY),
        8
      )
    );
  }
  draw(ctx) {
    this.circuit.draw(ctx);
    this.genSin.draw(ctx);
  }
  toggle() {
    this.circuit.toggle();
  }
}
