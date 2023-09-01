import Component from "../../framework/virtual_dom/src/Components/Component.js";
import { vNode } from "../../framework/virtual_dom/src/utils/vNode.js";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.modifiedData = {
      title: this.props.postData?.title,
      url: this.props.postData?.url,
    };
  }

  generateVirtualElement() {
    // debugger;
    return vNode(
      "div",
      { class: "overlay", style: this.props.toggle ? "" : "display:none;" },
      vNode(
        "div",
        { class: "form-container" },
        vNode(
          "h3",
          { style: "margin:10px 0;" },
          `Blog Post ${this.props.postData?.id}:`
        ),
        vNode(
          "form",
          {
            action: "post",
            on: {
              submit: (e) => e.preventDefault(),
            },
          },

          vNode("label", { for: "title", name: "title" }, "Title", vNode("br")),
          vNode("input", {
            type: "text",
            name: "title",
            id: "title",
            value: this.props.postData?.title,
            on: {
              change: (event) => {
                this.modifiedData["title"] = event.target.value;
              },
            },
          }),
          vNode("br"),
          vNode("br"),
          vNode(
            "label",
            { for: "image-src", name: "image-src" },
            "Image URL",
            vNode("br")
          ),
          vNode("input", {
            type: "text",
            name: "image-src",
            id: "image-src",
            value: this.props.postData?.url,
            on: {
              change: (event) => {
                this.modifiedData["url"] = event.target.value;
              },
            },
          }),
          vNode("br"),
          vNode("br"),
          vNode(
            "button",
            {
              on: {
                click: () =>
                  this.props.applyChanges(this.props.postData.id, {
                    title: this.modifiedData["title"],
                    url: this.modifiedData["url"],
                  }), //add changed values
              },
            },
            "Apply"
          ),
          vNode(
            "button",
            {
              on: {
                click: () => {
                  this.props.closeEditPost();
                },
              },
            },
            "Close"
          )
        )
      )
    );
  }
}

export default EditPost;
