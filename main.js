var canvas = document.getElementById("myCanvas");
canvas.width = 400;

var ctx = canvas.getContext("2d");
var car = new Car(canvas.width / 2, window.innerHeight / 2, 40, 80);

var road = new Road(canvas.width / 2, canvas.width - 20, 3);

animate();

function animate() {
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, canvas.height * 0.8 - car.y);
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}
