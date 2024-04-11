class Observable {
  constructor() {
    this.observers = [];
  }
  registerObserver(obs, update) {
    this.observers.push({ obs: obs, update: update });
  }
  notifyObservers() {
    this.observers.forEach((element) => {
      element.obs.set(element.update());
    });
  }
}
