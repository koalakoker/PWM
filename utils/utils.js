// Angle
function rpm2rads(rpm) {
  return (rpm / 60) * 2 * Math.PI;
}

function rads2rpm(rads) {
  return (rads * 60) / (2 * Math.PI);
}

// Graphic primitive
function drawLine(ctx, a, b, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawPoint(ctx, p, color, rad) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(p.x, p.y, rad, 0, Math.PI * 2, true);
  ctx.fill();
}

// Linear interpolation
function lerp(a, b, o) {
  return a + (b - a) * o;
}
