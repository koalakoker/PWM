function setInput(input, obj) {
  input.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      obj.update(input.value);
    }
  });
  input.addEventListener("changedPos", (e) => {
    let dy = e.detail.y - input.lastPos.y;
    input.value = parseInt(input.value) + dy;
    obj.update(input.value);
    input.lastPos = new Point(e.detail.x, e.detail.y);
  });
  function mouseMoveHandler(e) {
    let newEvent = new CustomEvent("changedPos", {
      detail: { x: e.x, y: e.y },
    });
    input.dispatchEvent(newEvent);
  }
  input.addEventListener("mousedown", (e) => {
    input.lastPos = new Point(e.x, e.y);
    document.addEventListener("mousemove", mouseMoveHandler);
  });
  document.addEventListener("mouseup", (e) => {
    document.removeEventListener("mousemove", mouseMoveHandler);
  });
}
