import Component from "../../framework/virtual_dom/src/Components/Component.js";
import { vNode } from "../../framework/virtual_dom/src/utils/vNode.js";

class Footer extends Component {
  constructor() {
    super();
  }

  generateVirtualElement() {
    return vNode(
      "footer",
      { class: "footer container" },
      "Footer",
      vNode("p", {}, "Right reserved 2023 | Ahmed Anwar Ibrahim ")
    );
  }
}

export default Footer;
