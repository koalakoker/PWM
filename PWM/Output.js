class Output {
  constructor(mode) {
    this.onLevel = 100;
    this.margin = 10;
    this.mode = mode;
    this.click = false;
  }
  draw(ctx) {
    let startX = this.PWM.getStartX();
    let bottomLevel = this.PWM.origin.y + this.margin + this.onLevel;
    if (this.PWM.counter.counterValues[0] >= this.PWM.compare.val) {
      startPoly(ctx, new Point(startX, bottomLevel - this.onLevel), "red", 3);
    } else {
      startPoly(ctx, new Point(startX, bottomLevel), "red", 3);
    }

    this.edgeDetectorInit();

    for (let x = 0; x < this.PWM.length; x++) {
      let pOn = new Point(startX + x, bottomLevel - this.onLevel);
      let pOff = new Point(startX + x, bottomLevel);
      let state;
      if (this.PWM.counter.counterValues[x] >= this.PWM.compare.val) {
        if (this.mode === 0) {
          state = pOn;
        } else {
          state = pOff;
        }
      } else {
        if (this.mode === 0) {
          state = pOff;
        } else {
          state = pOn;
        }
      }
      this.evaluateEdges(state);
      moveTo(ctx, state);
    }
    endPoly(ctx);
  }

  edgeDetectorInit() {
    this.risingPoints = [];
    this.fallingPoints = [];
    this.oldState = undefined;
  }

  evaluateEdges(state) {
    if (this.oldState === undefined) {
      this.oldState = state;
      return;
    }
    if (state.y < this.oldState.y) {
      this.risingPoints.push(state.x);
    } else if (state.y > this.oldState.y) {
      this.fallingPoints.push(state.x);
    }
    this.oldState = state;
  }

  overFalling(p) {
    if (this.inverticalRange(p)) {
      for (let i = 0; i < this.fallingPoints.length; i++) {
        let x = this.fallingPoints[i];
        if (p.x > x - 10 && p.x < x + 10) {
          return true;
        }
      }
    }
    return false;
  }
  overRising(p) {
    if (this.inverticalRange(p)) {
      for (let i = 0; i < this.risingPoints.length; i++) {
        let x = this.risingPoints[i];
        if (p.x > x - 10 && p.x < x + 10) {
          return true;
        }
      }
    }
    return false;
  }

  inverticalRange(p) {
    let yMax = this.PWM.origin.y + this.margin + this.onLevel;
    let yMin = yMax - this.onLevel;
    return p.y > yMin && p.y < yMax;
  }

  mouseDown(p) {
    if (this.overFalling(p)) {
    }
    if (this.overRising(p)) {
    }
  }

  mouseMove(p) {
    if (!this.click) {
      let v = this.overFalling(p);
      if (v === true) {
        canvas.style.cursor = "pointer";
      } else if (this.overRising(p) === true) {
        canvas.style.cursor = "pointer";
      }
    }
  }

  mouseUp(p) {}
}
