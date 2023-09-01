import { ElementTypes } from "../../types/ElementTypes.js";
import Component from "../Components/Component.js";

const createElement = (node) => {
  let newElement;

  switch (node.type) {
    case ElementTypes.TEXT_NODE:
      return document.createTextNode(node.value);

    case ElementTypes.FRAGMENT:
      newElement = new DocumentFragment();
      break;

    default:
      newElement = document.createElement(node.type);
      break;
  }

  // debugger;
  Object.keys(node.props || {}).forEach((key) => {
    if (key == "on") return;
    const attr = document.createAttribute(key);
    attr.value = node.props[key];

    newElement.setAttributeNode(attr);
  });

  if (node.props?.on) {
    updateEventListeners(node, null, newElement);
  }
  // debugger;

  if (node instanceof Component) {
    const returnedElement = node.render();
    return returnedElement;
  }

  for (let i = 0; i < node.children.length; i++) {
    let generatedElement = createElement(node.children[i]);
    newElement.appendChild(generatedElement);
  }

  return newElement;
};

const updateAttributes = (newVNode, oldVNode, currentElement) => {
  //exist in old node and same value *
  //exist in old node and diff value *
  //doesn't exist in old node *

  Object.keys(newVNode.props || {}).forEach((key) => {
    if (key == "on") return;

    const newState = newVNode.props[key];
    const oldState = oldVNode.props[key];

    if (oldState != newState) {
      currentElement.setAttribute(key, newState);
    }
  });

  //doesn't exist in new node => delete
  Object.keys(oldVNode.props || {}).forEach((key) => {
    if (key == "on") return;

    if (!(key in newVNode.props)) {
      currentElement.removeAttribute(key);
    }
  });
};

const updateEventListeners = (newVNode, oldVNode, currentElement) => {
  // debugger;
  const oldEvents = oldVNode?.props?.on;
  const newEvents = newVNode?.props?.on;

  Object.keys(oldEvents || {}).forEach((event) => {
    if (!newEvents[event]) {
      currentElement.removeEventListener(event, oldEvents[event]);
    }
  });

  Object.keys(newEvents || {}).forEach((event) => {
    if (!oldEvents) {
      currentElement.addEventListener(event, newEvents[event]);
      return;
    }

    if (oldEvents[event] !== newEvents[event]) {
      // Remove old event listener if it's being updated
      if (oldEvents[event]) {
        currentElement.removeEventListener(event, oldEvents[event]);
      }

      currentElement.addEventListener(event, newEvents[event]);
    }
  });
};

export { createElement, updateAttributes, updateEventListeners };
