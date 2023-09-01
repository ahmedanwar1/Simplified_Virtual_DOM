import Component from "../../framework/virtual_dom/src/Components/Component.js";
import { vNode } from "../../framework/virtual_dom/src/utils/vNode.js";
import { ElementTypes } from "../framework/virtual_dom/types/ElementTypes.js";
import Home from "../pages/Home.js";

class App extends Component {
  constructor() {
    super();
  }

  generateVirtualElement() {
    const home = new Home();

    // debugger;
    return vNode(ElementTypes.FRAGMENT, {}, home);
  }
}

export default App;
