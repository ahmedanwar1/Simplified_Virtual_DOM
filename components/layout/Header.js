import Component from "../../framework/virtual_dom/src/Components/Component.js";
import { vNode } from "../../framework/virtual_dom/src/utils/vNode.js";

class Header extends Component {
  constructor() {
    super();
  }

  generateVirtualElement() {
    return vNode(
      "header",
      { class: "header container" },
      "MY BLOG",
      vNode(
        "div",
        {},
        vNode("a", { href: "#" }, "Home"),
        vNode("a", { href: "#" }, "Post"),
        vNode("a", { href: "#" }, "About us")
      )
    );
  }
}

export default Header;
