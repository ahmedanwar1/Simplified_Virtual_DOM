class UseState {
  #data;

  constructor(state) {
    this.setState(state);
  }

  get data() {
    return this.#data;
  }

  setState(newState) {
    this.#data = JSON.parse(JSON.stringify(newState));
  }
}

export default UseState;
