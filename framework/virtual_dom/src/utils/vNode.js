import { ElementTypes } from "../../types/ElementTypes.js";

const createTextNode = (text) => {
  return {
    type: ElementTypes.TEXT_NODE,
    value: text,
  };
};

const vNode = (type, props, ...children) => {
  return {
    type,
    props,
    children: children.map((child) => {
      return typeof child === "object" ? child : createTextNode(child);
    }),
  };
};

export { vNode };
