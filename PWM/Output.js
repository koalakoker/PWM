class Output {
  constructor(mode) {
    this.onLevel = 100;
    this.margin = 10;
    this.mode = mode;
    this.click = false;
  }
  draw(ctx) {
    let startX = this.PWM.getStartX();
    let bottomLevel = this.getBottomLevel();

    let yUp = bottomLevel - this.onLevel;
    let yDown = bottomLevel;

    let pUp = new Point(startX, yUp);
    let pDown = new Point(startX, yDown);

    let startP;

    if (this.PWM.counter.counterValues[0] >= this.compare.val) {
      if (this.mode === 0) {
        startP = pUp;
      } else {
        startP = pDown;
      }
    } else {
      if (this.mode === 0) {
        startP = pDown;
      } else {
        startP = pUp;
      }
    }
    startPoly(ctx, startP, this.compare.color, 3);

    this.edgeDetectorInit();

    for (let x = 0; x < this.PWM.length; x++) {
      let pOn = new Point(startX + x, bottomLevel - this.onLevel);
      let pOff = new Point(startX + x, bottomLevel);
      let state;
      if (this.PWM.counter.counterValues[x] >= this.compare.val) {
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
          this.lastEdgeX = x;
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
          this.lastEdgeX = x;
          return true;
        }
      }
    }
    return false;
  }
  getBottomLevel() {
    return this.PWM.origin.y + (this.margin + this.onLevel) * (this.index + 1);
  }
  inverticalRange(p) {
    let yMax = this.getBottomLevel();
    let yMin = yMax - this.onLevel;
    return p.y > yMin && p.y < yMax;
  }

  mouseDown(p) {
    if (this.overFalling(p)) {
      canvas.style.cursor = "move";
      this.moveFalling = true;
      return true; // Stop propagating
    }
    if (this.overRising(p)) {
      canvas.style.cursor = "move";
      this.moveRising = true;
      return true; // Stop propagating
    }
    return false;
  }
  mouseMove(p) {
    if (this.moveFalling) {
      this.moveFallingFromP(p);
    } else if (this.moveRising) {
      this.moveRisingFromP(p);
    } else {
      if (this.overFalling(p)) {
        canvas.style.cursor = "pointer";
      } else if (this.overRising(p) === true) {
        canvas.style.cursor = "pointer";
      }
    }
  }
  mouseUp(p) {
    this.moveFalling = false;
    this.moveRising = false;
  }

  moveRisingFromP(p) {
    if (this.mode === 0) {
      this.changeDuty(p);
    } else if (this.mode === 1) {
      this.changeARR(p);
    }
  }
  moveFallingFromP(p) {
    if (this.mode === 0) {
      this.changeARR(p);
    } else if (this.mode === 1) {
      this.changeDuty(p);
    }
  }
  changeDuty(p) {
    let x = p.x - this.PWM.origin.x;
    let v = this.PWM.counter.getCounterValueAtX(parseInt(x));
    this.compare.update(v);
  }
  changeARR(p) {
    let v = parseInt(p.x - this.lastEdgeX);
    let newArr = this.PWM.counter.arr + v;
    this.PWM.counter.update(newArr);
    this.lastEdgeX = this.lastEdgeX + v;
  }
}
