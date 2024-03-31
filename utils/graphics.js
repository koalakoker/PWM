function drawLine(ctx, a, b, color, width, dash = []) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawArrow(ctx, a, b, color, width, arrowSize, dash = []) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();

  let angle = Math.atan2(a.y - b.y, b.x - a.x);
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(
    b.x - arrowSize * Math.cos(angle - Math.PI / 6),
    b.y + arrowSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(b.x, b.y);
  ctx.lineTo(
    b.x - arrowSize * Math.cos(angle + Math.PI / 6),
    b.y + arrowSize * Math.sin(angle + Math.PI / 6)
  );
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
