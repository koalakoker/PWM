// Angle
function rpm2rads(rpm) {
  return (rpm / 60) * 2 * Math.PI;
}

function rads2rpm(rads) {
  return (rads * 60) / (2 * Math.PI);
}

// Linear interpolation
function lerp(a, b, o) {
  return a + (b - a) * o;
}
