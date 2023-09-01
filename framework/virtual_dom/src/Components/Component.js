import { diff } from "../utils/diff.js";
import { createElement } from "../utils/elementMethods.js";
import UseState from "./UseState.js";

class Component {
  #virtualElement;
  #realElement;
  #props;
  #state;

  constructor(props) {
    this.#props = { ...props };
  }

  get props() {
    return this.#props;
  }

  get virtualElement() {
    return this.#virtualElement;
  }

  get realElement() {
    return this.#realElement;
  }

  //state

  get state() {
    return this.#state.data;
  }

  set state(newState) {
    this.#state = new UseState(newState);
  }

  setState(newState) {
    this.#state.setState(newState);
    this.render();
  }

  render() {
    let returnedRealElement;
    const generatedVElement = this.generateVirtualElement();

    if (!this.virtualElement) {
      returnedRealElement = createElement(generatedVElement);
    } else {
      returnedRealElement = diff(
        this.virtualElement,
        generatedVElement,
        this.realElement
      );
    }
    if (returnedRealElement) {
      this.#realElement = returnedRealElement;
    }
    this.#virtualElement = generatedVElement;

    return this.#realElement;
  }
}

export default Component;
