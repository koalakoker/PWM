class TriSinSignal {
  constructor(canvasHeight) {
    this.sinSignals = [];
    let spaceV = canvasHeight / 3;
    let yPos = spaceV / 2;
    let angle = 0;
    for (let i = 0; i < 3; i++) {
      this.sinSignals.push(
        new SinSignal(
          RotatingFlux.fluxColor[i],
          3,
          50,
          3,
          700,
          1100,
          yPos,
          angle
        )
      );
      yPos += spaceV;
      angle += (2 * Math.PI) / 3;
    }
  }
  draw() {
    this.sinSignals.forEach((sinSignal) => {
      sinSignal.draw(ctx);
    });
  }
  toggle() {
    this.sinSignals.forEach((sinSignal) => {
      sinSignal.toggle();
    });
  }
}
