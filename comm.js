class Comm {
  constructor(inerval_ms, createPacket) {
    this.interval_ms = inerval_ms;
    this.createPacket = createPacket;
    this.socket = new WebSocket("ws://localhost:3000");

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.transmissionInterval = setInterval(() => {
        this.sendMessage();
      }, this.interval_ms);
    };
  }
  sendMessage() {
    this.socket.send(this.createPacket());
  }
}
