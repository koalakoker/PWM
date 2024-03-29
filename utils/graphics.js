function drawLine(ctx, a, b, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawPoint(ctx, p, color, rad) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, rad, 0, Math.PI * 2, true);
  ctx.fill();
}

function drawCircle(ctx, p, rad, color, width) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.arc(p.x, p.y, rad, 0, Math.PI * 2, true);
  ctx.stroke();
}
