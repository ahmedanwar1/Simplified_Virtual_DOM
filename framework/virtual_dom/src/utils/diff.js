import { ElementTypes } from "../../types/ElementTypes.js";
import {
  createElement,
  updateAttributes,
  updateEventListeners,
} from "./elementMethods.js";

const diff = (oldVNode, newVNode, currentElement) => {
  // debugger

  //no new node, remove the corresponding DOM element
  if (!newVNode) {
    // debugger;
    currentElement.parentNode.removeChild(currentElement);
    return;
  }

  //no old node, create new element and append it to DOM
  if (!oldVNode) {
    let newElement;

    if (newVNode.type == ElementTypes.FRAGMENT) {
      newElement = new DocumentFragment();
    } else {
      newElement = createElement(newVNode);
    }

    currentElement.appendChild(newElement);
    return;
  }

  //they are the same node, just return
  if (oldVNode === newVNode) return;

  //check text and not equal
  if (
    newVNode.type === ElementTypes.TEXT_NODE &&
    oldVNode.type === ElementTypes.TEXT_NODE
  ) {
    if (oldVNode.value != newVNode.value) {
      currentElement.textContent = newVNode.value;
    }
    return;
  }

  //different nodes, create new element and replace the old one
  if (newVNode.type != oldVNode.type) {
    let newElement;

    if (newVNode.type == ElementTypes.FRAGMENT) {
      newElement = new DocumentFragment();
    } else {
      newElement = createElement(newVNode);
    }

    currentElement.parentNode.replaceChild(newElement, currentElement);
    return;
  }

  //nodes from the same type
  if (newVNode.type == oldVNode.type) {
    //check attributes and update
    updateAttributes(newVNode, oldVNode, currentElement);
    updateEventListeners(newVNode, oldVNode, currentElement);

    //get the max childern number to iterate through
    const maxVNodeChild = Math.max(
      oldVNode.children?.length,
      newVNode.children?.length
    );

    // debugger;
    for (let i = 0; i < maxVNodeChild; i++) {
      //set the next current element to apply changes in real DOM
      let nextCurrentELement;

      if (
        (newVNode?.children[i]?.type != ElementTypes.TEXT_NODE ||
          !newVNode?.children[i] ||
          newVNode?.children[i].type != oldVNode?.children[i].type) &&
        currentElement.children[i]
      ) {
        nextCurrentELement = currentElement.children[i];
      } else {
        nextCurrentELement = currentElement;
      }

      //recursive call for the childern of the virtual nodes
      diff(oldVNode.children[i], newVNode.children[i], nextCurrentELement);
    }

    return;
  }
};

export { diff };
