class RotatingFlux extends TogglableElement {
  static fluxColor = ["red", "green", "blue"];
  constructor() {
    super(() => {
      this.rotFluxCircuit.toggle();
    });
    let len = 200;
    let amp = 25;
    let angle = 0;
    let wave = 10;

    this.rotFluxCircuit = new Circuit();
    this.fluxes = [];
    for (let i = 0; i < 3; i++) {
      let inductor = new Inductor(
        amp,
        new Point(300, 300),
        len,
        wave,
        3,
        angle,
        RotatingFlux.fluxColor[i]
      );
      this.fluxes.push(inductor.flux);
      this.rotFluxCircuit.add(inductor);
      angle += (2 * Math.PI) / 3;
    }
    this.fluxVector = new Vector("black", 1, 0, { x: 300, y: 300 });
  }
  draw() {
    this.rotFluxCircuit.draw(ctx);
    if (this.isOn()) {
      let { mag, angle } = this.computeResultantFlux();
      this.fluxVector.angle = angle;
      this.fluxVector.mag = mag;
      this.fluxVector.draw(ctx);
    }
  }
  computeResultantFlux() {
    let dir = 0;
    let xTot = 0;
    let yTot = 0;
    for (let i = 0; i < this.fluxes.length; i++) {
      const flux = this.fluxes[i];
      let mag = flux.getMag();
      let x = mag * Math.cos(dir);
      let y = mag * Math.sin(dir);
      xTot += x;
      yTot += y;
      dir -= (2 * Math.PI) / 3;
    }
    let mag = Math.sqrt(xTot * xTot + yTot * yTot) * 0.8;
    let angle = Math.atan2(yTot, xTot);
    return { mag, angle };
  }
}
