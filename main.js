import Root from "./framework/virtual_dom/src/Root.js";
import App from "./components/App.js";

// debugger;
const root = new Root(document.getElementById("root"));

const app = new App();

root.setChildNode(app).render();
