class Root {
  #element;
  #child;

  constructor(element) {
    this.#element = element;
  }

  setChildNode(child) {
    this.#child = child;

    return this;
  }

  render() {
    this.#element.appendChild(this.#child.render());
  }
}

export default Root;
