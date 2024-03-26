class Controller {
  constructor() {
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.up = true;
          break;
        case "ArrowDown":
          this.down = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case " ":
          this.brake = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.up = false;
          break;
        case "ArrowDown":
          this.down = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case " ":
          this.brake = false;
          break;
        default:
          break;
      }
    });
  }
}
