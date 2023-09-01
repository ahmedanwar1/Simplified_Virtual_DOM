import Component from "../framework/virtual_dom/src/Components/Component.js";
import { ElementTypes } from "../framework/virtual_dom/types/ElementTypes.js";
import { vNode } from "../framework/virtual_dom/src/utils/vNode.js";
import Header from "../components/layout/Header.js";
import Footer from "../components/layout/Footer.js";
import BlogContainer from "../components/UI/BlogContainer.js";

class Home extends Component {
  constructor() {
    super();
  }

  generateVirtualElement() {
    const blogContainer = new BlogContainer();
    const header = new Header();
    const footer = new Footer();

    return vNode(ElementTypes.FRAGMENT, {}, header, blogContainer, footer);
  }
}

export default Home;
